import {
  getFormProps,
  getInputProps,
  getSelectProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Category } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { requireAdminId } from "~/.server/auth";
import {
  Select,
  FieldError,
  FormErrors,
  Label,
  SubmitButton,
  TextAreaInput,
  TextInput,
  Options,
} from "~/components";

const NewBlogPostSchema = z.object({
  category: z.enum(Object.values(Category) as [string, ...string[]]),
  title: z.string().max(50),
  content: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  console.log("category:", formData.get("category"));
  return {};
}

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
      <Form method="POST" {...getFormProps(form)} className="mt-10 space-y-3">
        <div>
          <Label fieldAttributes={{ htmlFor: "category" }}>
            Category
            <Select
              fieldAttributes={{
                ...getSelectProps(fields.category),
                autoFocus: true,
              }}
            >
              <Options>
                <option value="">-- Select a category --</option>
                {Object.values(Category).map((category) => (
                  <option key={category} value={category}>
                    {category
                      .toLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </option>
                ))}
              </Options>
            </Select>
          </Label>
          <FieldError field={fields.category} />
        </div>
        <div>
          <Label fieldAttributes={{ htmlFor: fields.title.id }}>
            Title
            <TextInput
              fieldAttributes={{
                ...getInputProps(fields.title, {
                  type: "text",
                }),
              }}
            />
          </Label>
          <FieldError field={fields.title} />
        </div>
        <div>
          <Label fieldAttributes={{ htmlFor: fields.content.id }}>
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
