import { FC } from 'react';
import Image from 'next/image';

import { Card, Button } from '~/components/ui';

import LogoBanorte from '~/public/logo-banorte.png';
import LogoFarmacia from '~/public/logo-farmacia-guadalajara.png';
import LogoSeven from '~/public/logo-7-eleven.png';
import { CMSBackAccount } from '~/types/Models/CMSBackAccount';

const PAYMENT_TEXT = {
  empeno: 'número de boleta',
  vale: 'número de vale',
  prestamo: 'número de préstamo',
};

interface Props {
  paymentType: 'empeno' | 'prestamo' | 'vale';
  actionCard: {
    title: string;
    description: string;
    imageSource: string | StaticImageData;
    buttonLabel: string;
    buttonHref: string;
  };
  contextCard: {
    title: string;
    description?: string;
    bankAccount?: CMSBackAccount;
  };
}

/**
 * Dejé el CSS de esa manera porque teoricamente no habría variantes
 */
const ServicePaymentCards: FC<Props> = ({ paymentType, actionCard, contextCard }) => {
  return (
    <div className="grid gap-4 sm:grid-flow-col">
      <Card className="flex flex-col">
        <div className="mb-6 flex-1 relative">
          <Image
            layout="fill"
            src={actionCard.imageSource as StaticImageData}
            alt="Logotipo Maxilana Vales"
            objectFit="contain"
          />
        </div>
        <div className="space-y-3 sm:text-left lg:space-y-4">
          <h5 className="text-2xl">{actionCard.title}</h5>
          <p>{actionCard.description}</p>
          <Button
            size="small"
            theme="primary"
            text={actionCard.buttonLabel}
            href={actionCard.buttonHref}
          />
        </div>
      </Card>
      <Card>
        <div>
          <h5 className="text-xl mb-3">{contextCard.title}</h5>
          <p className="text-secondary">{contextCard.description}</p>
          <div className="flex flex-row gap-4 flex-wrap items-center my-4">
            <Image
              width={124}
              height={29}
              layout="fixed"
              quality={70}
              src={LogoBanorte}
              placeholder="blur"
              alt="Logotipo de Banorte"
            />
            <Image
              width={124}
              height={47}
              layout="fixed"
              quality={70}
              src={LogoFarmacia}
              placeholder="blur"
              alt="Logotipo de Farmacia Guadalajara"
            />
            <Image
              width={49}
              height={47}
              layout="fixed"
              quality={70}
              src={LogoSeven}
              placeholder="blur"
              alt="Logotipo de 7Eleven"
            />
          </div>
          <div className="mb-6">
            <p className="text-lg mb-2">
              <strong>Números de cuentra para realizar tus pagos</strong>
            </p>
            <p className="text-secondary">
              <em className="text-primary font-normal">
                Cuenta {contextCard?.bankAccount?.bankName}:{' '}
              </em>
              {contextCard?.bankAccount?.number}
            </p>
            <p className="text-secondary">
              <em className="text-primary font-normal">Transferencia CLABE: </em>
              {contextCard?.bankAccount?.clabe}
            </p>
          </div>
          <div>
            <p className="text-secondary">1. Realiza tu depósito o transferencia.</p>
            <p className="text-secondary">
              {`2. Envía por WhatsApp tu comprobante de pago junto a tu ${PAYMENT_TEXT[paymentType]}.`}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServicePaymentCards;
