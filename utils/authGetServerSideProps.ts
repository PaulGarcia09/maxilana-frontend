import { GetServerSideProps } from 'next';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getAllCities from '~/api/getAllCities';
import withSession from '~/modules/lib/withSession';
import { City, CMSLegal, User } from '~/types/Models';

interface GSSProps {
  user?: User;
  cities?: City[];
  legalPages?: CMSLegal[];
}

// @ts-ignore
const authGetServerSideProps: GetServerSideProps<GSSProps> = withSession(async ({ req }) => {
  const user = req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const [cities, legalPages] = await Promise.all([getAllCities(), getAllLegalPages()]);

  return {
    props: {
      user,
      cities,
      legalPages,
      css: ['/antd/form.css', '/antd/radio.css', '/antd/tabs.css'],
    },
  };
});

export default authGetServerSideProps;
