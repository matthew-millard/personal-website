import {
  getFormProps,
  getInputProps,
  getSelectProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Category } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import slugify from "slugify";
import { z } from "zod";
import { requireAdminId } from "~/.server/auth";
import { prisma } from "~/.server/db";
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
import { formatCategory } from "~/utils";

const NewBlogPostSchema = z.object({
  category: z.enum(Object.values(Category) as [string, ...string[]]),
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(150),
  content: z.string(),
  imageUrl: z.string().url(),
  altText: z.string().min(1).max(125),
});

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminId(request);
  const formData = await request.formData();

  // validate data coming from the client
  const submission = parseWithZod(formData, {
    schema: NewBlogPostSchema,
  });

  if (submission.status !== "success") {
    return new Response(
      JSON.stringify(
        submission.reply({
          formErrors: ["Invalid submission"],
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

  const { altText, category, content, description, imageUrl, title } =
    submission.value;

  const slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });

  const newBlogPost = await prisma.blogPost.create({
    data: {
      altText,
      category: category as Category,
      content,
      description,
      imageUrl,
      title,
      slug,
    },
  });

  if (!newBlogPost) {
    return new Response(
      JSON.stringify(
        submission.reply({
          formErrors: ["Unexpected server error occured"],
        }),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }

  return redirect(`/blog/${newBlogPost.slug}`);
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
                    {formatCategory(category)}
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
          <Label fieldAttributes={{ htmlFor: fields.description.id }}>
            Description
            <TextInput
              fieldAttributes={{
                ...getInputProps(fields.description, {
                  type: "text",
                }),
              }}
            />
          </Label>
          <FieldError field={fields.description} />
        </div>
        <div>
          <Label fieldAttributes={{ htmlFor: fields.imageUrl.id }}>
            Image Url
            <TextInput
              fieldAttributes={{
                ...getInputProps(fields.imageUrl, {
                  type: "text",
                }),
              }}
            />
          </Label>
          <FieldError field={fields.imageUrl} />
        </div>
        <div>
          <Label fieldAttributes={{ htmlFor: fields.altText.id }}>
            Alt Text
            <TextInput
              fieldAttributes={{
                ...getInputProps(fields.altText, {
                  type: "text",
                }),
              }}
            />
          </Label>
          <FieldError field={fields.altText} />
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
