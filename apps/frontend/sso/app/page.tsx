import Image, { type ImageProps } from 'next/image';

import styles from './page.module.css';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <nav aria-label="Main navigation">
          <ThemeImage
            className={styles.logo}
            srcLight="turborepo-dark.svg"
            srcDark="turborepo-light.svg"
            alt="Turborepo logo"
            width={180}
            height={38}
            priority
          />
        </nav>
      </header>
      <main className={styles.main}>
        <section aria-labelledby="getting-started">
          <h2 id="getting-started" className="sr-only">
            Getting Started Steps
          </h2>
          <ol>
            <li>
              Get started by editing <code>apps/web/app/page.tsx</code>
            </li>
            <li>Save and see your changes instantly.</li>
            <li>Test your changes locally.</li>
            <li>Run Lighthouse to check performance and accessibility.</li>
            <li>Deploy your changes to production when ready.</li>
          </ol>
        </section>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            <span>Deploy now</span>
          </a>
          <a
            href="https://turbo.build/repo/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            <span>Read our docs</span>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <nav aria-label="Resource links">
          <a
            href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/window.svg" alt="" width={16} height={16} aria-hidden="true" />
            <span>Examples</span>
          </a>
          <a
            href="https://turbo.build?utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/globe.svg" alt="" width={16} height={16} aria-hidden="true" />
            <span>Go to turbo.build →</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}
