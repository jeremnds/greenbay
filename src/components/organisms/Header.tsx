"use client";

import NavBar from "./NavBar";

export default function Header({ isLogged }: { isLogged: boolean }) {
  return <NavBar isLogged={isLogged} />;
}
