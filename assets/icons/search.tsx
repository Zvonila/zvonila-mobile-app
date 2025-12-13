import Svg, { Path, SvgProps } from 'react-native-svg';

export default function SearchIcon(props: SvgProps & { pathStroke: string }) {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <Path d="M12.5 12.5L17.5 17.5M8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667Z" stroke={props.pathStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}