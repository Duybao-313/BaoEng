import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Gom tat ca Provider toan cuc vao mot cho.
 *
 * Them provider moi (vi du) theo thu tu tu ngoai vao trong:
 *   <GestureHandlerRootView style={{ flex: 1 }}>
 *     <SafeAreaProvider>
 *       <QueryClientProvider client={queryClient}>
 *         <AuthProvider>{children}</AuthProvider>
 *       </QueryClientProvider>
 *     </SafeAreaProvider>
 *   </GestureHandlerRootView>
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function AppProviders({ children }) {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}
