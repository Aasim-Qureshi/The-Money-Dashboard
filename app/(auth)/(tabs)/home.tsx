import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import RoundBtn from '@/components/RoundBtn';
import DropDown from '@/components/DropDown';
import { useBalanceStore } from '@/store/balanceStore';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import WidgetList from '@/components/SortableList/WidgetList';
import {useHeaderHeight} from '@react-navigation/elements';

const Home = () => {

  const {balance, runTransaction, transactions, clearTransaction} = useBalanceStore()
  const headerHeight = useHeaderHeight()


  const onAddPress = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000 * (Math.random() > 0.5 ? 1 : -1)),
      date: new Date(),
      title: "Add Money"
    })
  }


  return (
    <ScrollView style={{backgroundColor: Colors.background, flex: 1}} contentContainerStyle={{paddingTop: headerHeight}} >
      <View style={styles.account} >
        <View style={styles.row} >
          <Text style={styles.currency} >₹</Text>
          <Text style={styles.balance} >{balance()}</Text>
        </View>
      </View>
        <View style={styles.actionRow} >
          <RoundBtn icon='add' text='Add' onPress={onAddPress} />
          <RoundBtn icon='refresh' text='Exchange' onPress={clearTransaction} />
          <RoundBtn icon='list' text='Details' onPress={onAddPress} />
          <DropDown/>
        </View>


        <Text style={defaultStyles.sectionHeader} >Transactions</Text>
        <View>
          {(transactions.length === 0) && (
            <View style={styles.transactionContainer} >
              <Text style={{padding: 14, color: Colors.gray, fontSize: 15}} >No Transactions Yet</Text> 
            </View>
          )}
          {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>
        )}
        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={styles.transactionContainer}>
            <View style={styles.circle}>
              <Ionicons
                name={transaction.amount > 0 ? 'add' : 'remove'}
                size={24}
                color={Colors.dark}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '500' }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction.date.toLocaleString()}
              </Text>
            </View>
            <Text>{transaction.amount}€</Text>
          </View>
        ))}
            
            <Text style={defaultStyles.sectionHeader} >Widget List</Text>
            <WidgetList/>
          
         

        </View>
      </ScrollView>

  )
}

export default Home

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold"
  },
  currency: {
    fontSize: 35,
    fontWeight: "400"
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },

  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginHorizontal: 14,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 10
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center"
},
})