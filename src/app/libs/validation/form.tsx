import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email("Email nije vazeci!"),
  password: z.string(),
})

export const registerFormSchema = z.object({
    email: z.string().email("Email nije vazeci!"),
    password: z.string().min(8, "Lozinka mora biti najmanje 8 karaktera dugacka!"),
    confirmPassword: z.string(),
    name: z.string().min(3, "Ime mora sadrzati najmanje 3 karaktera!")
}).refine(data => data.password === data.confirmPassword, { 
  message: 'Lozinke se moraju poklapati!',
  path: ['confirmPassword']
})

export const postCreationFormSchema = z.object({
  title: z.string().min(5, "Minimalna duzina naslova je 5 karaktera"),
  subtitle: z.string(),
  body: z.string().min(20, "Minimalna duzina texta je 5 karaktera"),
  categoryId: z.string().min(1, "Neophodno je specifikovati kategoriju"),
  fotoIzvor: z.string(),
  image: z.string().min(1, "Neophodno je unjeti sliku"),
  // slug: z.string().min(1, "Neophodno polje"),
  subcategoryId: z.string(),
  positionPrimary: z.boolean(),
  positionSecondary: z.boolean(),
  izvor: z.string()
  // authorId: z.string().min(1, "Greska sa autorom...pokusaj ponovo kasnije..")
})

export const subcategoryCreationFormSchema = z.object({
  categoryId: z.string().min(1, 'Neophodno je oznaciti kategoriju kojoj pripada!'),
  colorHex: z.string().default('#000000'),
  name: z.string().min(1, 'Ime subkategorije je obavezno!')
})

export const commentCreationFormSchema = z.object({
  text: z.string().min(1, "Polje sadržaja je obavezno!"),
  // postId: z.string().min(1),
  // isReply: z.boolean(),
  // parrentCommentId: z.string()
})

export const searchPostsFormSchema = z.object({
  text: z.string()
})

export type TSRegisterSchema = z.infer<typeof registerFormSchema>;
export type TSLoginSchema = z.infer<typeof loginFormSchema>;
export type TSPostWritingSchema = z.infer<typeof postCreationFormSchema>;
export type TSSubcategoryCreation = z.infer<typeof subcategoryCreationFormSchema>
export type TSCommentCreationForm = z.infer<typeof commentCreationFormSchema>
export type TSPostSearchForm = z.infer<typeof searchPostsFormSchema>