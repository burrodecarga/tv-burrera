import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
  },

  calculatorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  resultadoContainer: {
    flex: 3/7,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  carrerasContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    borderColor: Colors.darkGray,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    
  
  },


  mainResult: {
    color: Colors.textPrimary,
    fontSize: 70,
    textAlign: 'right',
    fontWeight: '400',
    // fontFamily: 'SpaceMono',
  },

  subResult: {
    color: Colors.textSecondary,
    fontSize: 40,
    textAlign: 'right',
    fontWeight: '300',
  },

  row: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  col: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,

  },

  button: {
    height: 50,
    width: 50,
    backgroundColor: Colors.darkGray,
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    color: Colors.textPrimary,
    fontWeight: '300',
    fontFamily: 'SpaceMono',
  },

  scrollView: {
    flex: 1,
    justifyContent: 'center',
   
  },
});
