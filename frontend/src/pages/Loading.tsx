import LoadingCircle from "@/components/LoadingCircle";


export default function Loading() {
  return (
    <div className="h-screen flex flex-col gap-10 items-center justify-center">
      <p className="text-3xl">Loading</p>
      <LoadingCircle />
    </div>
  )
}
