import { useCreateContactMutation } from 'api';
import { useEffect } from 'react';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';

export const useBrevoContact = () => {
  const user = useTypedSelector(userSelectors.user);

  const [createContact] = useCreateContactMutation();

  const onCreateContact = async () => {
    try {
      await createContact({
        userId: user.uid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }).unwrap();
    } catch {
      /** empty */
    }
  };

  useEffect(() => {
    if (user.uid) {
      onCreateContact();
    }
  }, [user.uid]);
};
