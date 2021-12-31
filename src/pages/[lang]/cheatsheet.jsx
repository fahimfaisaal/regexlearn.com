import { useIntl } from 'react-intl';
import Head from 'next/head';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';

import data from 'src/cheatsheet.json';

import { defaultLocale, locales } from 'src/localization';

export default function Home() {
  const { formatMessage } = useIntl();

  const firstBlockDatas = data.slice(0, 3);
  const secondBlockDatas = data.slice(3, 4);
  const thirdBlockDatas = data.slice(4, 6);

  return (
    <>
      <Header />
      <Head>
        <title>{formatMessage({ id: 'page.cheatsheet.title' })}</title>
        <link rel="canonical" href="https://regexlearn.com/cheatsheet" />
        <meta name="description" content={formatMessage({ id: 'page.cheatsheet.description' })} />
      </Head>
      <div className="container flex-1">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            {firstBlockDatas.map(arr => (
              <div key={arr.title}>
                <h4>{formatMessage({ id: arr.title })}</h4>
                {arr.data.map(item => (
                  <Collapse
                    key={item.title}
                    data={item}
                    title={<CheatsheetItemTitle data={item} />}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="col-lg-4 col-md-6">
            {secondBlockDatas.map(arr => (
              <div key={arr.title}>
                <h4>{formatMessage({ id: arr.title })}</h4>
                {arr.data.map(item => (
                  <Collapse
                    key={item.title}
                    data={item}
                    title={<CheatsheetItemTitle data={item} />}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="col-lg-4 col-md-6">
            {thirdBlockDatas.map(arr => (
              <div key={arr.title}>
                <h4>{formatMessage({ id: arr.title })}</h4>
                {arr.data.map(item => (
                  <Collapse
                    key={item.title}
                    data={item}
                    title={<CheatsheetItemTitle data={item} />}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const lang = params.lang || defaultLocale;
  const messages = require(`src/localization/${lang}/`)?.default;

  return {
    props: {
      lang,
      messages,
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: locales
      .filter(locale => locale !== defaultLocale)
      .map(lang => ({
        params: {
          lang,
        },
      })),
  };
}
