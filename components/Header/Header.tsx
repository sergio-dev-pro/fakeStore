"use client";
import React from "react";
import { Dropdown } from "../Dropdown";
import { Logo } from "../Logo";
import "./header.scss";
import { Button } from "../Button";
import { Link } from "../Link";
import { useRouter } from "next/navigation";
type Props = {};

export const Header = (props: Props) => {
  const router = useRouter();
  return (
    <header>
      <Logo />
      <Dropdown>
        <Dropdown.Target>Minha conta</Dropdown.Target>
        <Dropdown.Content>
          <Button style="secondary" className="dropdown__content__button">
            <Link href="/signin">Fazer login</Link>
          </Button>
          <Button style="secondary" className="dropdown__content__button">
            <Link href="/new-account">Criar conta</Link>
          </Button>
        </Dropdown.Content>
      </Dropdown>
    </header>
  );
};
