import AuthForm from "@/components/AuthForm"
import { ThemeProvider } from "@/components/theme-detector"

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen flex items-center justify-center p-4">
        <AuthForm />
      </main>
    </ThemeProvider>
  )
}


// export default function Home() {
//   return (
//     <ThemeProvider>
//       <main className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
//         <AuthForm />
//       </main>
//     </ThemeProvider>
//   )
// }
