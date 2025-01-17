import {
  DateTime,
  CategoryTag,
  ReadTime,
  UnorderedList,
  ListItem,
  H1,
  H2,
  P,
  Figure,
  FigCaption,
  Image,
} from "~/components";
import posts from "~/data/blog";

export default function BlogPostRoute() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <DateTime
          fontSize="text-base"
          fontWeight="font-medium"
          date={posts[0].date}
          dateTime={posts[0].datetime}
        />
        <p className="text-primary font-medium">|</p>
        <ReadTime fontSize="text-base" text={posts[0].readTime} />
      </div>
      <div className="mt-2">
        <CategoryTag
          title={posts[0].category.title}
          href={posts[0].category.href}
        />
      </div>
      <H1>{posts[0].title}</H1>
      <p className="mt-6 text-xl/8 text-color-muted">{posts[0].description}</p>

      <section>
        <UnorderedList>
          <ListItem
            label="Factorial"
            description={`A factorial, denoted as n!, is the product of all positive integers from 11 to 𝑛 n. It is a mathematical operation used in various areas of mathematics, including combinatorics, algebra, and calculus`}
          />
        </UnorderedList>
      </section>
      <section>
        <H2>This is a sub heading!</H2>
        <P>
          Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
          varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
          cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
          molestie. Gravida quis fringilla amet eget dui tempor dignissim.
          Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum
          convallis quam.
        </P>
        <Figure>
          <Image
            imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
            altText="Random picture"
          />
          <FigCaption>This is a figure caption.</FigCaption>
        </Figure>
      </section>
    </div>
  );
}
