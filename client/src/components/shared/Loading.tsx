export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-white border-green"></div>
        <a href="/" className=" items-center justify-center gap-4 mb-4 text-sm text-green max-w-2xs sm:max-w-xs md:max-w-sm lg:max-w-md text-center mt-6">If the page doesnt load, try refreshing, or click here to go <span className="underline font-semibold">home</span>.</a>
  </div>
  )
}