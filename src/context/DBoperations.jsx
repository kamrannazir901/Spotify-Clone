import { createContext, useContext, useEffect, useState } from "react";
import supabase, { supabaseAdmin } from "../supabaseClient";
import { data, useNavigate } from "react-router-dom";

const DBContext = createContext();

function DBoperations({ children }) {
  const [isLogin, setisLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      const data = await checkSession();
      if (data?.session) {
        setisLogin(true);
      }
    };

    checkUserSession();
  }, []);

  const fetchAlbums = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("albums").select("*");
    if (error) {
      // console.info("Error fetching:", error);
    } else {
      setLoading(false);
      setAlbums(data);
    }
  };

  async function getLoggedInUserName() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      // console.error("User not logged in");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();

    if (profileError) {
      // console.error("Error fetching profile:", profileError.message);
      return;
    }

    return profile.display_name;
  }

  async function signUpUser(formData) {
    const { email, password, name: display_name, dob, gender, tos } = formData;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      return { success: false, message: signUpError.message };
    }

    const user = signUpData?.user;

    if (!user) {
      return { success: false, message: "User creation failed" };
    }

    // ✅ Now this should succeed without FK error
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      display_name,
      dob,
      gender,
      tos,
    });

    if (profileError) {
      return { success: false, message: profileError.message };
    }

    return { success: true, message: "User signed up successfully" };
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    setisLogin(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
    return {
      success: true,
      message: "Logged in successfully",
    };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return { success: false, message: error.message };
    }

    setisLogin(false);
    navigate("/");
  };
  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    return data;
  };

  async function deleteAllUsers() {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) return console.error("Failed to list users:", error.message);

    for (const user of data.users) {
      const { error: delError } = await supabaseAdmin.auth.admin.deleteUser(
        user.id
      );
      if (delError) {
        console.error(`Failed to delete ${user.email}:`, delError.message);
      } else {
        console.log(`Deleted user: ${user.email}`);
      }
    }
  }

  // deleteAllUsers();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const contextValues = {
    loading,
    albums,
    isLogin,
    setisLogin,
    signUpUser,
    login,
    logout,
    checkSession,
    getLoggedInUserName,
  };
  return (
    <DBContext.Provider value={contextValues}>{children}</DBContext.Provider>
  );
}

export default DBoperations;
export const useDB = () => useContext(DBContext);
