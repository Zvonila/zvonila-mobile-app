import { CallType } from '@/entities/calls.entities';
import { UserType } from '@/entities/user.entities';
import { declineCall, getCall } from '@/infrastructure/call.api';
import { getUser } from '@/infrastructure/users.api';
import { getToken } from '@/utils/access-token.utils';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IncomingCallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [call, setCall] = useState<CallType | undefined>()
  const [inUser, setInUser] = useState<UserType | undefined>()

  useEffect(() => {
    const laod = async () => {
      const token = await getToken() || "";
      const call = await getCall({
        id: parseInt(id),
        access_token: token
      })
      if (call.data) {
        setCall(call.data)
        const user = await getUser({ access_token: token, id: call.data.initiator_id })
        setInUser(user.data)
      }
    }
    laod()
  }, [id])

  const declineCallHandler = async () => {
    if (!call) return;
    const token = await getToken() || "";
    const res = await declineCall({
      call_id: call.id,
      access_token: token,
    })

    if (!res.error) {
      router.back()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.incomingText}>Входящий звонок...</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.avatar}
      />
      <Text style={styles.callerName}>{inUser?.name}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.declineBtn} onPress={declineCallHandler}>
          <Text style={styles.btnText}>Отклонить</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptBtn}>
          <Text style={styles.btnText}>Принять</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  incomingText: {
    color: '#aaa',
    fontSize: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  callerName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 40,
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  declineBtn: {
    backgroundColor: '#E53935',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  acceptBtn: {
    backgroundColor: '#43A047',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
