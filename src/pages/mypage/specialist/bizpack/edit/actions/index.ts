export const responseFormat = (bizpack: any) => {
  return {
    category: { type: bizpack.category.type },
    title: bizpack.title,
    products: bizpack.products.map((product: any) => { return { name: product.name } }),
    industry: bizpack.industry,
    scale: bizpack.scale,
    description: bizpack.description,
    unitPrice: bizpack.unitPrice,
    duration: bizpack.duration,
    isPublic: bizpack.isPublic
  }
}