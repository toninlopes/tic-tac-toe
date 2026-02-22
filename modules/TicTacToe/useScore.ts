import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Victory } from './types';

const KEY_FOR_X = 'X';
const KEY_FOR_O = 'O';
const KEY_FOR_DRAW = 'draw';

export const EMPTY_SCORE: ScoreType = {
  X: 0,
  O: 0,
  draw: 0,
}

export type ScoreType = {
  X: number;
  O: number;
  draw: number;
}

export const useScore = () => {
  const navigation = useNavigation();

  const [score, setScore] = useState<ScoreType>(EMPTY_SCORE);

  const storeGame = async (victory?: Victory | null) => {
    const symbol = victory?.player.symbol || KEY_FOR_DRAW;

    const currentValueAsNumber = async (s: string): Promise<number> => {
      try {
        const val = await AsyncStorage.getItem(s);
        return Number(val);
      } catch (error) { }
      return 0
    };

    const currentValueForKey = await currentValueAsNumber(symbol);
    const newValueToStore = currentValueForKey + 1;

    try {
      await AsyncStorage.setItem(symbol, `${newValueToStore}`);
    } catch (error) { }
  };

  const getScores = async (): Promise<ScoreType> => {
    const values = await AsyncStorage.multiGet([KEY_FOR_X, KEY_FOR_O, KEY_FOR_DRAW]);

    const newScore: ScoreType = {
      X: Number(values[0][1]) || 0,
      O: Number(values[1][1]) || 0,
      draw: Number(values[2][1]) || 0,
    }

    setScore(newScore);

    return newScore;
  };

  const resetScores = async () => {
    try {
      await AsyncStorage.clear();
      setScore(EMPTY_SCORE);
    } catch (error) { }
  };

  useEffect(() => {
    const updateFocus = () => {
      getScores();
    }

    updateFocus()

    const unsubscribe = navigation.addListener('state', updateFocus);
    return unsubscribe;
  }, [navigation]);

  return {
    score,
    storeGame,
    getScores,
    resetScores,
  }
};