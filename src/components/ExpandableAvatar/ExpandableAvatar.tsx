import React, { useEffect, useState } from 'react';
import './style.css';
import defaultIcon from './reward-gateway-logo.jpeg';
export interface ExpandableAvatarProps {
    uri: string;
    expanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
}
function ExpandableAvatar(props: ExpandableAvatarProps) {
	const [expanded, setExpanded] = useState(false);

	useEffect(()=>{
		if(props.expanded !== expanded) {
			setExpanded(!!props.expanded);
		}
	}, [props.expanded]);

	function getClassName() {
		return `expandableAvatarContainer ${expanded ? 'expandableAvatarContainer-expanded' : ''}`;
	}

	function toggleExpanded() {
		const newState = !expanded;
		setExpanded(newState);
		props.onExpandChange && props.onExpandChange(newState);
	}

	function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
		e.currentTarget.src = defaultIcon;
	}

	return (
		<div className={getClassName()} data-testid="image-toggle" onClick={toggleExpanded}>
			<img src={props.uri} onError={handleImageError} />
		</div>
	);
}

export default ExpandableAvatar;
