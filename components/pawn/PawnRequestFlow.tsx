import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, useReducer } from 'react';

import PawnRequest from './PawnRequest';
import Calculator from './Calculator';
import SelectCity from './SelectCity';
import SelectArticle from './SelectArticle';
import RequestForm from './RequestForm';

import getCalculatedPawn from '~/api/getCalculatedPawn';
import useEffectOnUpdate from '~/hooks/useEffectOnUpdate';
import parseQuery from '~/utils/parseQuery';
import { PawnCalculation } from '~/types/Models';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { CMSWhatsApp } from '~/types/Models/CMSWhatsApp';

type FormRequest = {
  codigokilataje?: number;
  gramos?: string;
  codigomarca?: number;
  plaza: number;
  correo: string;
  monto: number;
};

type Status =
  | 'idle'
  | 'show_whatsapp_list'
  | 'show_articles'
  | 'show_request_form'
  | 'show_calculator';

type State = {
  status: Status;
  category: number | null;
  article: number;
  pawnConfig: PawnCalculation | null;
  whatsapp: CMSWhatsApp | null;
  requestFormType: CMSCategory['formType'];
};

interface Props {
  categories: CMSCategory[];
  whatsapps: CMSWhatsApp[];
}

const initialState: State = {
  status: 'idle',
  category: null,
  article: -1,
  pawnConfig: null,
  whatsapp: null,
  requestFormType: 'default',
};

const reducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case 'SHOW_START':
      return initialState;
    case 'IDLE':
      return initialState;
    case 'SHOW_WHATSAPP_LIST':
      return { ...state, status: 'show_whatsapp_list' };
    case 'SHOW_ARTICLES':
      return {
        ...state,
        category: payload?.category || state.category,
        status: 'show_articles',
      };
    case 'SHOW_REQUEST_FORM':
      return {
        ...state,
        status: 'show_request_form',
        ...(payload.article
          ? { article: payload.article, requestFormType: payload.requestFormType }
          : {}),
      };
    case 'SHOW_CALCULATOR':
      return {
        ...state,
        status: 'show_calculator',
        pawnConfig: payload.config,
        whatsapp: payload.whatsapp,
      };
    case 'SET':
      return {
        ...state,
        ...payload,
      };
    default:
      console.log(type);
    // throw new Error('No existe esa acción');
  }
};

const PawnRequestFlow: FC<Props> = ({ categories, whatsapps }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer<(state: State, action: any) => State>(reducer, initialState);

  useEffectOnUpdate(() => {
    const query: ParsedUrlQuery = { status: state.status };
    if (state.category) query.category = `${state?.category}`;
    if (state.article > -1) query.article = `${state?.article}`;
    if (state.status !== 'idle' || Object.keys(router.query).length) {
      router.push(`?${parseQuery(query)}`, undefined, { shallow: true });
    }
  }, [state.status, state.article]);

  useEffectOnUpdate(() => {
    let payload = { ...state, ...router.query };
    if (!Object.keys(router.query).length) payload = initialState;
    dispatch({
      type: 'SET',
      payload,
    });
  }, [router.query]);

  const handleRequestForm = async (data: FormRequest) => {
    const params = {
      ...data,
      codigoarticulo: state.article,
    };

    const config = await getCalculatedPawn(params);

    dispatch({
      type: 'SHOW_CALCULATOR',
      payload: {
        config,
        whatsapp: whatsapps?.find?.((item) => `${item.cityCode}` === `${data.plaza}`),
      },
    });
  };

  if (state.status === 'show_whatsapp_list') {
    return <SelectCity onBack={router.back} items={whatsapps} />;
  }

  if (state.status === 'show_articles' && state.category !== null) {
    return (
      <SelectArticle
        onBack={router.back}
        category={categories.find((item) => item.id === state.category)}
        onSelectArticle={(article, requestFormType) => {
          dispatch({
            type: 'SHOW_REQUEST_FORM',
            payload: { article, requestFormType },
          });
        }}
      />
    );
  }

  if (state.status === 'show_request_form') {
    return (
      <RequestForm
        onBack={router.back}
        formType={state.requestFormType}
        onSubmit={handleRequestForm}
      />
    );
  }

  if (state.status === 'show_calculator' && state.pawnConfig && state.whatsapp) {
    return (
      <Calculator
        data={state.pawnConfig}
        whatsapp={state.whatsapp}
        onBack={router.back}
        onRestart={() => {
          dispatch({ type: 'SHOW_START' });
        }}
      />
    );
  }

  return (
    <PawnRequest
      categories={categories}
      onSelect={(category) => {
        if (category?.subcategories?.length) {
          dispatch({
            type: 'SHOW_ARTICLES',
            payload: { category: category.id },
          });
        } else {
          dispatch({
            type: 'SHOW_REQUEST_FORM',
            payload: { article: category?.code || 2 },
          });
        }
      }}
      onWhatsappClick={() => {
        dispatch({ type: 'SHOW_WHATSAPP_LIST' });
      }}
    />
  );
};

export default PawnRequestFlow;
