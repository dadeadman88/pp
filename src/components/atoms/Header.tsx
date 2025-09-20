import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTSIZE, IMAGES, headerHeight, screenWidth } from '../../constants';
import { Typography } from './Typography';
import { NotificationIcon } from '../icons/NotificationIcon';
import { useSelector } from 'react-redux';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { navigate, onBack } from '../../navigation/RootNavigation';
import { commonStyles } from '../../style';
import { selectAppState } from '../../store/selectors/appSelector';

type Props = {
	title: string;
	titleContent: string;
	navigation: any;
	backBtn?: boolean;
	rightIcons: JSX.Element;
	fixed?: boolean;
};

export const Header = (props: Props) => {
	const userState = useSelector(selectAppState);
	const name = userState?.user?.full_name
	// const { name } = userState.user;
	const {
		title,
		titleContent,
		userName = null,
		fixed = true,
		backBtn = false,
		notificationBtn = true,
		rightIcons = null,
		color = '#fff',
		style = {},
	}: any = props;

	return (
		<View
			style={[
				styles.header,
				style,
				fixed ? { zIndex: 5 } : {}
			]}>
			<View style={styles.headerContent}>
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
					{backBtn && (
						<TouchableOpacity style={{ flex: 1 }} onPress={() => onBack()}>
							<ArrowLeftIcon color={'#fff'} />
						</TouchableOpacity>
					)}
				</View>

				<View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
					{title && (
						<Typography textType='semiBold' size={FONTSIZE.M} color={color}>
							{title}
						</Typography>
					)}
					{titleContent && (
						<View style={[commonStyles.flexRowAlignCenter, { alignSelf: "center", marginVertical: 0 }]}>
							<Image
								source={IMAGES.handImg}
								style={{ width: 20, height: 20 }}
								resizeMode="cover"
							/>
							<Typography style={{ marginLeft: 10 }} size={FONTSIZE.M} color={COLORS.white}>Hello,</Typography>
							<Typography style={{ marginLeft: 5 }} size={FONTSIZE.M} color={COLORS.primary}>{name}</Typography>
						</View>
					)}
				</View>

				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>

					{notificationBtn && (
						<TouchableOpacity style={{}} onPress={() => navigate('Notification')}>
							<View style={styles.bubble} >
								<Typography color={'#000'} size={11}>1</Typography>
							</View>
							<NotificationIcon color={COLORS.white} />
						</TouchableOpacity>
					)}

					{rightIcons && rightIcons}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: headerHeight,
		width: screenWidth(100),
		paddingHorizontal: 20,
		justifyContent: 'center',
		paddingVertical: 10,
	},
	headerContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	roundedBtn: {
		backgroundColor: '#fff',
		height: 35,
		width: 35,
		borderRadius: 25,
		padding: 8,
	},
	notificationIcon: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		width: 35,
		height: 35,
		borderRadius: 8,
	},
	bubble: {
		position: 'absolute',
		backgroundColor: '#FFCB42',
		width: 16,
		height: 16,
		borderRadius: 10,
		alignItems: 'center',
		top: -10,
		right: -10,
	}
});
