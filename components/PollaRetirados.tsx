import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const PollaRetirados = (pollaID: any) => {
  const [retirados, setRetirados] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getRetirados = async () => {
      try {
        setLoading(true);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getRetirados();
  }, []);
  return (
    <View>
      <Text>PollaRetirados {pollaID}</Text>
    </View>
  );
};

export default PollaRetirados;
