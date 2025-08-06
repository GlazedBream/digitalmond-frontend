import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [ageGroup, setAgeGroup] = useState(null);
  const [companion, setCompanion] = useState(null);
  const [activityLevel, setActivityLevel] = useState(null);
  const [preference, setPreference] = useState(null);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const storedAgeGroup = await AsyncStorage.getItem('filter_ageGroup');
        const storedCompanion = await AsyncStorage.getItem('filter_companion');
        const storedActivityLevel = await AsyncStorage.getItem('filter_activityLevel');
        const storedPreference = await AsyncStorage.getItem('filter_preference');

        if (storedAgeGroup) setAgeGroup(JSON.parse(storedAgeGroup));
        if (storedCompanion) setCompanion(JSON.parse(storedCompanion));
        if (storedActivityLevel) setActivityLevel(JSON.parse(storedActivityLevel));
        if (storedPreference) setPreference(JSON.parse(storedPreference));
      } catch (e) {
        console.error('Failed to load filters from AsyncStorage', e);
      }
    };
    loadFilters();
  }, []);

  const setAndSaveAgeGroup = async (value) => {
    setAgeGroup(value);
    await AsyncStorage.setItem('filter_ageGroup', JSON.stringify(value));
  };

  const setAndSaveCompanion = async (value) => {
    setCompanion(value);
    await AsyncStorage.setItem('filter_companion', JSON.stringify(value));
  };

  const setAndSaveActivityLevel = async (value) => {
    setActivityLevel(value);
    await AsyncStorage.setItem('filter_activityLevel', JSON.stringify(value));
  };

  const setAndSavePreference = async (value) => {
    setPreference(value);
    await AsyncStorage.setItem('filter_preference', JSON.stringify(value));
  };

  const value = {
    ageGroup, setAgeGroup: setAndSaveAgeGroup,
    companion, setCompanion: setAndSaveCompanion,
    activityLevel, setActivityLevel: setAndSaveActivityLevel,
    preference, setPreference: setAndSavePreference,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
