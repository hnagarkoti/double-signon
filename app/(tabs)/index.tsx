import { Image, StyleSheet, Platform, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WebViewContainer } from '@/components/WebViewContainer';

export default function HomeScreen() {
 
  const POSSIBLE_VALUES = [
    {
      label: `Close All Web View`,
      id: 1,
      url: ``
    },
    {
      label: `Open Campus App`,
      id: 2,
      url: `https://campus.walmart.com`
    },
    {
      label: `Open Auto Care`,
      id: 3,
      url: `https://ce.walmart.com/content/onebestway/1bw-home/store/auto-care-center.html`
    },
    {
      label: `Open Another Guide`,
      id: 4,
      url: `https://ce.walmart.com/content/LearningandDevelopment/cta/learn.html`
    },
    {
      label: `Clear All Cookies`,
      id: 5,
      url: `https://example.com/`
    }
  ]
 
  const [values, setValues] = useState(POSSIBLE_VALUES[0])

  const [aemCookies, setAemCookies] = useState(null);
  const onCookieSet = () => {

  }
  
  console.log(`aemCookies in parnet: `, aemCookies)

  return (
    <PreviewLayout
      label="direction"
      selectedValue={values}
      values={POSSIBLE_VALUES}
      // values={[POSSIBLE_VALUES[0].label, POSSIBLE_VALUES[1].label, POSSIBLE_VALUES[2].label]}
      setSelectedValue={setValues}>
      <View style={[styles.box, {backgroundColor: 'powderblue'}]}>
        {/* {
          values.id === 1 ? <Text>Successfully closed</Text> : ( */}
            <WebViewContainer 
              url={values.url}
              id={values.id}
              sharedCookiesEnabled={true}
              setAemCookies={setAemCookies}
              aemCookies={aemCookies}
            />
          {/* )
        } */}
        
      </View>
    </PreviewLayout>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  box: {
    flex: 1,
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}: any) => (
  <View style={{padding: 10, flex: 1}}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map(value => (
        <TouchableOpacity
          key={value.id}
          onPress={() => setSelectedValue(value)}
          style={[styles.button, selectedValue === value.id && styles.selected]}>
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value.id && styles.selectedLabel,
            ]}>
            {value.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container]}>{children}</View>
  </View>
);