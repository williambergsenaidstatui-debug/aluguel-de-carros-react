import React from "react";
import {Text, StyleSheet} from "react-native"
import{usefonts} from "expo-font"

export default function Texto({txt}){
    const [ font] = usefonts({

    'spider':require('../assets/fonts/spider.ttf')

    })

    if(!font){

        return null;
    }
        
    return(

        <Text style={test.txt}>{txt}</Text>

    );
}
 const test = StyleSheet.create({

    txt:{

      color:"#0dff00",
      fontSize:50,
      fontFamily:"spider",
    }


 })