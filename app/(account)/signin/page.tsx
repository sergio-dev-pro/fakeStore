import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import './page.scss'
export default function Login() {
  return (
    <form>
      <Input label="Nome de usuário" />
      <Input label="Senha" type="password" />
      <Button>Pronto</Button>
    </form>
  );
}
