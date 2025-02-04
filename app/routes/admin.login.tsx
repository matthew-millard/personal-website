import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { loginAdmin, redirectIfAdminLoggedIn } from "~/.server/auth";
import { sessionKey } from "~/.server/config";
import { getCookie, sessionStorage } from "~/.server/session";
import {
  FieldError,
  FormErrors,
  H2,
  Label,
  SubmitButton,
  TextInput,
} from "~/components";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  await redirectIfAdminLoggedIn(request);
  const formData = await request.formData();

  const submission = await parseWithZod(formData, {
    async: true,
    schema: LoginSchema.transform(async (data, ctx) => {
      const session = await loginAdmin(data);

      if (!session) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email or password",
        });
        return z.NEVER;
      }

      return { ...data, session };
    }),
  });

  if (submission.status !== "success") {
    return new Response(
      JSON.stringify(
        submission.reply({
          formErrors: ["Invalid email or password"],
          hideFields: ["password"],
        }),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      },
    );
  }

  const { session } = submission.value;

  const cookieSession = await getCookie(request);
  cookieSession.set(sessionKey, session.id);

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(cookieSession, {
        expires: session.expirationDate, // Remember me permanently set
      }),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  await redirectIfAdminLoggedIn(request);
  return {};
}

export default function AdminLoginRoute() {
  const [form, fields] = useForm({
    id: "admin-login",
    lastResult: useActionData(),
    constraint: getZodConstraint(LoginSchema),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },
  });

  return (
    <div className="mx-auto mt-24 max-w-lg">
      <H2>Log in to your account</H2>
      <Form
        method="POST"
        {...getFormProps(form)}
        className="mt-10 space-y-4 text-color"
      >
        <div>
          <Label fieldAttributes={{ id: fields.email.id }}>
            Email
            <TextInput
              fieldAttributes={{
                ...getInputProps(fields.email, { type: "email" }),
                autoFocus: true,
              }}
            />
          </Label>
          <FieldError field={fields.email} />
        </div>
        <div>
          <Label fieldAttributes={{ id: fields.password.id }}>
            Password
            <TextInput
              fieldAttributes={{
                ...getInputProps(fields.password, { type: "password" }),
              }}
            />
          </Label>
          <FieldError field={fields.password} />
        </div>
        <div>
          <SubmitButton>Log in</SubmitButton>
        </div>
        <FormErrors errorId={form.errorId} errors={form.errors} />
      </Form>
    </div>
  );
}
