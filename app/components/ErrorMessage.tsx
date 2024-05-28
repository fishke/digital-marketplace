import { State } from "../actions";

type ErrorMessageProps = {
  name: string;
  state?: State;
};

export default function ErrorMessage({ name, state }: ErrorMessageProps) {
  return (
    state?.errors?.[name]?.[0] && (
      <p className="text-destructive">{state?.errors?.[name]?.[0]}</p>
    )
  );
}
