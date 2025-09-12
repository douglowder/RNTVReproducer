import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
// import { useFocusEffect } from '@react-navigation/native';

interface Props {
    callback:any;
    navigation: any;
    action: string;
    title: string;
    hasPreferredFocus?: boolean;
}
