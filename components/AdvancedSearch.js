import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RangeSlider from 'rn-range-slider';
import RnSlider from './RnSlider';

import Icon from 'react-native-vector-icons/Ionicons';
const AdvancedSearch = () => {
  const [openCondition, setOpenCondition] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [brandValue, setBrandValue] = useState(null);
  const [conditionValue, setConditionValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);
  const [locationValue, setLocationValue] = useState(null);
  const [brands, setBrands] = useState([
    {label: 'Toyota', value: 'Toyota Corolla'},
    {label: 'Suzuki', value: 'Suzuki Mehran'},
    {label: 'Honda', value: 'Honda Civic'},
  ]);
  const [modelData, setModelData] = useState([
    {label: '2018', value: '2018'},
    {label: '2019', value: '2019'},
    {label: '2020', value: '2020'},
  ]);
  const [locationData, setLocationData] = useState([
    {label: 'Islamabad', value: 'Islamabad'},
    {label: 'Karachi', value: 'Karachi'},
    {label: 'Lahore', value: 'Lahore'},
  ]);
  const [conditionData, setConditionData] = useState([
    {label: 'New', value: 'New'},
    {label: 'Old', value: 'Old'},
  ]);

  const zIndexCondition = openCondition ? 1 : 0;
  const zIndexBrand = openBrand ? 1 : 0;
  const zIndexModel = openModel ? 1 : 0;
  const zIndexLocation = openLocation ? 1 : 0;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={[styles.dropdownView, {zIndex: zIndexCondition}]}>
        <Text style={styles.label}>Condition</Text>
        <DropDownPicker
          style={{
            backgroundColor: '#E6ECFB',
            borderWidth: 2,
            borderRadius: 20,
            borderColor: 'grey',
          }}
          open={openCondition}
          value={conditionValue}
          items={conditionData}
          setOpen={setOpenCondition}
          setValue={setConditionValue}
          setItems={setConditionData}
          placeholder={'Select Condition'}
          textStyle={{
            fontSize: 15,
            color: 'dimgray',

            fontFamily: 'Urbanist-Medium',
          }}
          dropDownContainerStyle={{
            backgroundColor: '#E6ECFB',
            borderWidth: 0,
            borderRadius: 20,
          }}
        />
      </View>

      <View style={[styles.dropdownView, {zIndex: zIndexBrand}]}>
        <Text style={styles.label}>Brand</Text>
        <DropDownPicker
          style={{
            backgroundColor: '#E6ECFB',
            borderWidth: 2,
            borderRadius: 20,
            borderColor: 'grey',
          }}
          open={openBrand}
          value={brandValue}
          items={brands}
          setOpen={setOpenBrand}
          setValue={setBrandValue}
          setItems={setBrands}
          placeholder={'Select Brand'}
          textStyle={{
            fontSize: 15,
            color: 'dimgray',
          }}
          dropDownContainerStyle={{backgroundColor: '#E6ECFB', borderWidth: 0}}
        />
      </View>

      <View style={[styles.dropdownView, {zIndex: zIndexModel}]}>
        <Text style={styles.label}>Model</Text>
        <DropDownPicker
          style={{
            backgroundColor: '#E6ECFB',
            borderWidth: 2,
            borderRadius: 20,
            borderColor: 'grey',
          }}
          open={openModel}
          value={modelValue}
          items={modelData}
          setOpen={setOpenModel}
          setValue={setModelValue}
          setItems={setModelData}
          placeholder={'Select Model'}
          textStyle={{
            fontSize: 15,
            color: 'dimgray',
          }}
          dropDownContainerStyle={{backgroundColor: '#E6ECFB', borderWidth: 0}}
        />
      </View>

      <View style={[styles.dropdownView, {zIndex: zIndexLocation}]}>
        <Text style={styles.label}>Location</Text>
        <DropDownPicker
          style={{
            backgroundColor: '#E6ECFB',
            borderWidth: 2,
            borderRadius: 20,
            borderColor: 'grey',
          }}
          open={openLocation}
          value={locationValue}
          items={locationData}
          setOpen={setOpenLocation}
          setValue={setLocationValue}
          setItems={setLocationData}
          placeholder={'Select Location'}
          textStyle={{
            fontSize: 15,
            color: 'dimgray',
          }}
          dropDownContainerStyle={{backgroundColor: '#E6ECFB', borderWidth: 0}}
        />
      </View>

      <View style={styles.priceView}>
        <Text style={styles.price}>Price</Text>
        <RnSlider></RnSlider>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {}} style={styles.submitButton}>
          <Text style={styles.buttonText}>Search</Text>
          <Icon name="checkmark-done-sharp" size={27} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    flexDirection: 'row-reverse', // Reverse the flexDirection
    backgroundColor: 'rgba(35, 61, 123, 0.9)',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: '50%',
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    borderWidth: 0.5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Urbanist-Regular',
  },
  priceView: {
    marginHorizontal: 22,
    marginTop: 10,
    flex: 0.5,
  },
  price: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Urbanist-Bold',
  },
  label: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Urbanist-Bold',
  },
  dropdownView: {
    marginHorizontal: 22,
    marginTop: 5,
    width: '90%',
  },
});

export default AdvancedSearch;
