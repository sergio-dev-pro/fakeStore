"use client";
import React from "react";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Link } from "../Link";
import { Dropdown } from "../Dropdown";
import "./header.scss";

export const Header = () => {
  return (
    <header>
      <Logo />
      <Dropdown title="Minha conta">
        <Button style="secondary" className="dropdown__content__button">
          <Link href="/signin">Fazer login</Link>
        </Button>
        <Button style="secondary" className="dropdown__content__button">
          <Link href="/new-account">Criar conta</Link>
        </Button>
      </Dropdown>
    </header>
  );
};
