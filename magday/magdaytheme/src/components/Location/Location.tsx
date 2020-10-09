import { useEffect } from "react";
import { useLocation } from "react-router";
interface Props {
	onRouteChanged: () => void;
}

const ShowTheLocation = (props: Props) => {
	const location = useLocation();
	useEffect(() => {
		console.log("ShowTheLocation props.onRouteChanged()");
		props.onRouteChanged();
	}, [location]);
	return null;
};
export default ShowTheLocation;
