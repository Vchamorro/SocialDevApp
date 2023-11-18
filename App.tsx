/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Header } from "./Components/Header";
import { Navigation } from "./navigation/Navigation";
import { SafeAreaView } from "react-native"


function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Navigation />
    </SafeAreaView>
  )
}



export default App;
