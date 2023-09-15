import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const email = String(context.query.email);

  if (email) {
    const drafts = await prisma.post.findMany({
      where: {
        author: { email: email },
        published: false,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    return {
      props: {
        drafts,
      },
    };
  }

  return {
    props: {},
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = ({ drafts }: Props) => {
  const [authorEmail, setAuthorEmail] = useState("");

  const handleSearch = async (email) => {
    await Router.push(`/drafts?email=${authorEmail}`);
  };

  if (Object.keys(drafts).length) {
    return (
      <Layout>
        <div className="page">
          <h1>My Drafts</h1>
          <main>
            {drafts.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
            <button onClick={() => Router.push("/drafts")}>Back</button>
          </main>
        </div>
        <style jsx>{`
          .post {
            background: var(--geist-background);
            transition: box-shadow 0.1s ease-in;
          }

          .post:hover {
            box-shadow: 1px 1px 3px #aaa;
          }

          .post + .post {
            margin-top: 2rem;
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout>
      <input
        autoFocus
        onChange={(e) => setAuthorEmail(e.target.value)}
        placeholder="Type Author email to see his drafts"
        type="text"
        value={authorEmail}
      />
      <button onClick={() => handleSearch({ authorEmail })}>Search</button>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }

        input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
