import { createContext, useContext, useState, useEffect } from 'react';
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import lab from '../assets/labTested.png'


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState(null); // Add cartId state
    const [amount, setAmount] = useState(null);
    const [showCartSidebar, setShowCartSidebar] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [refetchAddress, setRefetchAddress] = useState(0)
    const [refetchCart, setRefetchCart] = useState(0)
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [loadingProduct,setLoadingProduct]=useState(false)




    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);
    const [attendanceId, setAttendanceId] = useState(null);

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedUserId = localStorage.getItem('userId');
        const storedPhoneNumber = localStorage.getItem('phoneNumber');
        const storedProfilePic = localStorage.getItem('profilePic');
        const storedToken = localStorage.getItem('jwtToken');
        const storedAttendanceId = localStorage.getItem('attendanceId');
        const storedCartId = localStorage.getItem('cartId');
        if (storedEmail) setEmail(storedEmail);
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedUserId) setUserId(storedUserId);
        if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
        if (storedProfilePic) setProfilePic(storedProfilePic);
        if (storedToken) setJwtToken(storedToken);
        if (storedAttendanceId) setAttendanceId(storedAttendanceId);
        if (storedCartId) setCartId(Number(storedCartId)); // Initialize cartId
    }, []);

    // Function to handle login and store data
    const login = ({ email, firstName, lastName, userId, phoneNumber, profilePic, jwtToken, attendanceId }) => {
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setUserId(userId);
        setPhoneNumber(phoneNumber);
        setProfilePic(profilePic);
        setJwtToken(jwtToken);
        setAttendanceId(attendanceId);
        localStorage.setItem('email', email);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('userId', userId);
        localStorage.setItem('phoneNumber', phoneNumber || '');
        localStorage.setItem('profilePic', profilePic || '');
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('attendanceId', attendanceId);
    };

    // Function to handle logout
    const logout = () => {
        setEmail(null);
        setFirstName(null);
        setLastName(null);
        setUserId(null);
        setPhoneNumber(null);
        setProfilePic(null);
        setJwtToken(null);
        setAttendanceId(null);
        setCart([]); // Reset cart
        setCartId(null); // Reset cartId
        localStorage.removeItem('email');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userId');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('profilePic');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('attendanceId');
        localStorage.removeItem('cartId');
    };

    const toggleCartSidebar = () => {
        setShowCartSidebar(prev => !prev);
    };

    const openCartSidebar = () => {
        setShowCartSidebar(true);
    };

    const closeCartSidebar = () => {
        setShowCartSidebar(false);
    };

    return (
        <AuthContext.Provider value={{
            cart,
            setCart,
            cartId,
            setCartId,
            amount,
            setAmount,
            showCartSidebar,
            toggleCartSidebar,
            openCartSidebar,
            closeCartSidebar,
            products,
            setProducts,
            email,
            firstName,
            lastName,
            userId,
            phoneNumber,
            profilePic,
            jwtToken,
            attendanceId,
            login,
            logout,
            isSignInModalOpen, setIsSignInModalOpen,
            addresses, setAddresses,
            refetchAddress, setRefetchAddress,
            refetchCart, setRefetchCart,
            isProfileModalOpen, setIsProfileModalOpen,
            loadingProduct,setLoadingProduct
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}