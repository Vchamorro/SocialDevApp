/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Navigation } from "./navigation/Navigation";
import { SafeAreaView } from "react-native"


function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Navigation />
      <Footer />
    </SafeAreaView>
  )
}



export default App;
