import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Divider,
  extendTheme,
  Header,
  Headline,
  Inline,
  Inset,
  Link as MLink,
  MarigoldProvider,
  Message,
  Stack,
  Text,
} from '@marigold/components';
import theme from '@marigold/theme-b2b';
import React, { useEffect, useState } from 'react';
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
import { DataTableX } from '../src/components';

const sendRememberMessageToBot = () => {
  fetch(
    // @ts-ignore
    `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=584840017&text=Hello%20from%20your%20new%20bot`
  ).then(response => response.json());
};

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState<string | string[]>('');

  useEffect(() => {
    setMessage(router.query.message ?? '');
    delete router.query.message;
    router.push(router);
  }, []);

  //Fix: checkbox are now shown in data table with marigold
  const customTheme = extendTheme(theme, {
    root: {
      input: {
        appearance: 'auto',
      },
    },
  });

  return (
    <MarigoldProvider theme={customTheme}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Remember-me-service</title>
      </Head>

      <Stack>
        <Header>
          <Headline align="center" color="secondary">
            Remember me service
          </Headline>
        </Header>

        <Divider />

        <Inset space="small">
          {message.length > 0 ? (
            <Message messageTitle="Success" variant="info">
              <Text color="green">{message}</Text>
            </Message>
          ) : null}
        </Inset>
        <DataTableX />
        <Stack alignX="right">
          <Inline space="small">
            <Button key="addReminder" variant="ghost">
              <MLink as={Link} href="/reminderPage">
                Add reminder
              </MLink>
            </Button>
            <Button variant="ghost" key="addUser">
              <MLink as={Link} href="/userPage">
                Add user
              </MLink>
            </Button>
            <Button
              variant="primary"
              key="syncData"
              onClick={() => sendRememberMessageToBot()}
            >
              Send test message to telegram
            </Button>
          </Inline>
        </Stack>
        <Text>Current Version: alpha-v0.2</Text>
      </Stack>
    </MarigoldProvider>
  );
}
