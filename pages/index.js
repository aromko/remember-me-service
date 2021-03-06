import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DataTableX from '../src/components/dataTable'
import Button from '@mui/material/Button'

const sendRememberMessageToBot = () => {
 fetch(
   `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=584840017&text=Hello%20from%20your%20new%20bot`
 ).then((response) => response.json()); 
};

export default function Home() {
  const router = useRouter()
  let message = router.query.message ?? '';
  console.log(message);
  return (
    <div className="container">
      <Head>
        <name>Alert Service</name>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="name">
        Remember me service
        </h1>
        <DataTableX />
        {message.length > 0 ? <div style={{color: 'green'}}>{message}</div> : null } 
        <Button key="addReminder" style={{ backgroundColor: 'White' }}>
          <Link href="/reminderPage">
            <a>Add reminder</a>
          </Link>
        </Button>       
      </main>

      <buttons>
        <Button key="addUser" style={{ backgroundColor: 'White' }}>
          <Link href="/userPage">
            <a>Add user</a>
          </Link>
        </Button>
        <Button key="delete" onClick={() => sendRememberMessageToBot()} style={{ backgroundColor: 'White' }}>
          SyncData
        </Button>
      </buttons>

      <footer>
        <p>Current Version: v0.1</p>
      </footer>
        

      <style jsx>{`
        .container {
          border: 2px solid red;
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          border: 2px solid green;
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        buttons {
          border: 2px solid pink;
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
        }

        footer {
          border: 2px solid yellow;
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
