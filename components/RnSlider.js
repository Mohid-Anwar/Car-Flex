import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RangeSliderRN from 'rn-range-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  label: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#D2D2D2',
    margin: 20,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000000',
    marginHorizontal: 20,
  },
  slider: {
    width: '90%',
    height: 120,
  },
  thumbContainer: {
    alignItems: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#233D7B',
    borderWidth: 1,
    borderColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
  rail: {
    flex: 1,
    height: 5,
    borderRadius: 2,
    backgroundColor: '#233D7B',
  },
  railSelected: {
    height: 5,
    backgroundColor: '#FE6600',
    borderRadius: 2,
  },
});

const SimpleRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(100000);
  const [maxPrice, setMaxPrice] = useState(1000000);
  useEffect(() => {
    console.log('Selected Price Range:', {minPrice, maxPrice});
  }, [minPrice, maxPrice]);
  const renderThumb = useCallback(
    () => (
      <View style={styles.thumbContainer}>
        <View style={styles.thumb} />
        <Text style={styles.tooltip}>{`Rs. ${minPrice}`}</Text>
      </View>
    ),
    [minPrice],
  );

  const renderRail = useCallback(() => <View style={styles.rail} />, []);
  const renderRailSelected = useCallback(() => null, []); // No selected rail

  const handleValueChange = useCallback((low, high) => {
    setMinPrice(low);
    setMaxPrice(high);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.label}>Min</Text>
          <Text style={styles.value}>{`Rs. ${minPrice}`}</Text>
        </View>
        <View>
          <Text style={styles.label}>Max</Text>
          <Text style={styles.value}>{`Rs. ${maxPrice}`}</Text>
        </View>
      </View>
      <RangeSliderRN
        style={styles.slider}
        min={100000}
        max={1000000}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

export default SimpleRangeSlider;
