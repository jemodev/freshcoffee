import { z } from "astro:content";

const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    acf: z.object({
        icon: z.string().url(),
    }),
});

export const CategoriesSchema = z.array(CategorySchema);
export type Category = z.infer<typeof CategorySchema>;
