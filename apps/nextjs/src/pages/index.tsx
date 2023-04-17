import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../components/ui/button";

const Card: React.FC<{
  user: inferProcedureOutput<AppRouter["user"]["currentUser"]>;
}> = ({ user }) => {
  return (
    <div className="max-w-2xl rounded-lg border-2 border-gray-500 p-4 transition-all hover:scale-[101%]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {user?.address ?? '??'}
      </h2>
      <p>{user?.id ?? '??'}</p>
    </div>
  );
};

const Home: NextPage = () => {
  const userQuery = trpc.user?.currentUser.useQuery();

  return (
    <>
      <Head>
        <title>App Starter</title>
        <meta name="description" content="Starter App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <AuthShowcase />

          <div className="flex h-[60vh] justify-center px-4 text-2xl">
            {userQuery.data ? (
              <div className="flex flex-col gap-4">
                return <Card key={userQuery.data?.id} user={userQuery.data} />;
              </div>
            ) : <></>
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!isSignedIn },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <p className="text-center text-2xl">
            {secretMessage && (
              <span>
                {" "}
                {secretMessage} click the user button!
                <br />
              </span>
            )}
          </p>
          <div className="flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "3rem",
                    height: "3rem",
                  },
                },
              }}
            />
          </div>
        </>
      )}
      {!isSignedIn && (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          <Button>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </p>
      )}
    </div>
  );
};
