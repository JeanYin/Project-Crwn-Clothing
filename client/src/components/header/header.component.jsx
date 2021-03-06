import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {ReactComponent as Logo} from '../../assets/crown.svg';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../cart-icon/cart-icon.component';
import {auth} from '../../firebase/firebase.utils';
const Header = ({currentUser,hidden}) =>(
	<HeaderContainer>
		<LogoContainer to='/'>
			<Logo className = 'logo'/>
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to= '/'>
				HOME
			</OptionLink>
			<OptionLink to= '/shop'>
				SHOP
			</OptionLink>
			{
				currentUser?(
				<OptionDiv onClick={()=>auth.signOut()}>
					SIGN OUT
				</OptionDiv>
				):(
				<OptionLink to='/signin'>
					SIGN IN
				</OptionLink>
			)}
			<CartIcon/>
		</OptionsContainer>
		{	
			hidden?null:<CartDropdown/>
		}
		
	</HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);