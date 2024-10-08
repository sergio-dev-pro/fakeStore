"use client";
import React, { useLayoutEffect, useState } from "react";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Link } from "../Link";
import { Dropdown } from "../Dropdown";
import "./header.scss";
import { getCredentialsByCookie, removeAuthCookie } from "@/helpers/cookie";
import { redirect } from "next/navigation";

export const Header = () => {
  const [credentials, setCredentials] = useState<any>();

  useLayoutEffect(() => {
    const credentials = getCredentialsByCookie();
    if (credentials) setCredentials(credentials);
  }, []);

  const exit = () => {
    removeAuthCookie();
    redirect("/signin");
  };
  const username = credentials?.username;
  return (
    <header>
      <Logo />
      <Dropdown
        title={username ? username : "Minha conta"}
        buttonStyle={username && "secondary-blue"}
        buttonClassName="dropdown__my-account-button"
        buttonSize="large"
      >
        {username ? (
          <Button
            style="secondary"
            className="dropdown__button dropdown__exit-button"
            onClick={exit}
          >
            <Link href="/">Sair</Link>
          </Button>
        ) : (
          <>
            <Button
              style="secondary"
              className=" dropdown__button dropdown__login-button"
            >
              <Link href="/signin">Fazer login</Link>
            </Button>
            <Button style="secondary" className="dropdown__button">
              <Link href="/new-account">Criar conta</Link>
            </Button>
          </>
        )}
      </Dropdown>
    </header>
  );
};
