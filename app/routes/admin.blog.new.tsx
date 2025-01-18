import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { requireAdminId } from "~/.server/auth";
import {
  FieldError,
  FormErrors,
  Label,
  SubmitButton,
  TextAreaInput,
  TextInput,
} from "~/components";

const NewBlogPostSchema = z.object({
  title: z.string().max(50),
  content: z.string(),
});

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminId(request);
  return {};
}

export default function BlogNewRoute() {
  const [form, fields] = useForm({
    id: "new-blog-post",
    constraint: getZodConstraint(NewBlogPostSchema),
    lastResult: useActionData(),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onSubmit",
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: NewBlogPostSchema });
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-color lg:text-4xl">
        Upload a new blog post
      </h1>
      <Form method="POST" {...getFormProps(form)} className="mt-10 space-y-6">
        <div>
          <Label fieldAttributes={{ id: fields.title.id }}>
            Title
            <TextInput
              fieldAttributes={{
                ...getInputProps(fields.title, {
                  type: "text",
                  autoFocus: true,
                }),
              }}
            />
          </Label>
          <FieldError field={fields.title} />
        </div>
        <div>
          <Label fieldAttributes={{ id: fields.content.id }}>
            Content
            <TextAreaInput
              fieldAttributes={{
                ...getTextareaProps(fields.content),
                rows: 10,
              }}
            />
          </Label>
          <FieldError field={fields.content} />
        </div>
        <FormErrors errorId={form.errorId} errors={form.errors} />
        <SubmitButton>Post</SubmitButton>
      </Form>
    </div>
  );
}
