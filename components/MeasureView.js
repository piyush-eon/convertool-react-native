import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import convert from "convert-units";
import { Picker } from "@react-native-picker/picker";
import { primaryColor } from "./colors";
import { SimpleLineIcons } from "@expo/vector-icons";

const MeasureView = ({ measure }) => {
  const units = convert().possibilities(measure);

  const [fromUnit, setFromUnit] = useState(units[0]);
  const [value, setValue] = useState("0");

  const [toUnit, setToUnit] = useState(units[1]);
  const [valueConverted, setValueConverted] = useState(0);

  useEffect(() => {
    setValueConverted(
      convert(+value)
        .from(fromUnit)
        .to(toUnit)
        .toFixed(2)
    );
  }, [value, fromUnit, toUnit]);

  return (
    <View style={styles.scene}>
      <View style={styles.row}>
        <Picker
          style={styles.column}
          selectedValue={fromUnit}
          onValueChange={setFromUnit}
        >
          {units.map((unit, i) => (
            <Picker.Item label={unit} value={unit} key={i} />
          ))}
        </Picker>
        <View style={styles.column}>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>
      </View>
      <SimpleLineIcons
        name="arrow-down-circle"
        size={40}
        color={primaryColor}
        style={{ alignSelf: "center" }}
      />
      <View style={styles.row}>
        <Picker
          style={styles.column}
          selectedValue={toUnit}
          onValueChange={setToUnit}
        >
          {units.map((unit, i) => (
            <Picker.Item label={unit} value={unit} key={i} />
          ))}
        </Picker>
        <View style={styles.column}>
          <Text
            style={[
              styles.input,
              { borderBottomWidth: 0, fontSize: 40, fontWeight: "bold" },
            ]}
          >
            {valueConverted}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    height: 40,
    borderColor: primaryColor,
    borderBottomWidth: 1,
    fontSize: 30,
    textAlign: "center",
  },
});

export default MeasureView;
