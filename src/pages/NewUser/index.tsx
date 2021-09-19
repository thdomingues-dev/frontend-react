import { FormEvent, useState, useContext } from 'react';
import authService from '../../contexts/auth';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';

import './styles.css';

const NewUser = () => {
  const { analyst } = useContext(authService);
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [featureOne, setFeatureOne] = useState<boolean>(true);
  const [featureTwo, setFeatureTwo] = useState<boolean>(true);
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [streetNumber, setStreetNumber] = useState<number>(0);
  const [salaryBase, setSalaryBase] = useState<number>(0);
  const [enabledFeatures, setEnabledFeatures] = useState<number[]>([])

  const [isRequestSucceeded, setIsRequestSucceeded] = useState<boolean>(false);
  const [isRequestFailed, setIsRequestFailed] = useState<boolean>(false)

  const [errorMessage, setErrorMessage] = useState<any>('')

  const toggleFeatureOne = () => setFeatureOne(!featureOne)
  const toggleFeatureTwo = () => setFeatureTwo(!featureTwo)

  async function handleUserRequire(e: FormEvent) {
    e.preventDefault();

   try {
    if (featureOne) setEnabledFeatures([...enabledFeatures, 0])
    if (featureTwo) setEnabledFeatures([...enabledFeatures, 1])

    const createUserResponse = await api.post('/users', {
      name,
      email,
      document,
      birthDate,
      enabledFeatures,
      metadatas: {
        validDocument: true,
        verified: true
      },
      address: {
        city,
        state,
        postalCode,
        streetNumber
      },
      salaryBase
    });

    const createAuditResponse = await api.post('/audits/', {
      createdAt: new Date().toISOString(),
      type: 'user-create',
      before: {
        status: "new"
      },
      after: {
        status: "created"
      },
      analyst_id: analyst.user_id,
    });

    setIsRequestSucceeded(true);
    setIsRequestFailed(false);

    return { createUserResponse, createAuditResponse }
   } catch (error: any) {
      setIsRequestSucceeded(false);
      setIsRequestFailed(true);
      setErrorMessage(error?.error);
   }
  }

  return (
    <div className="newuser-container">
      <PageHeader />

      <PageTitle
          title="Cadastrar usuários"
          description="Aqui é possível criar um novo usuário para utilizar nossa plataforma."
      />

      <main>
          <form onSubmit={handleUserRequire}>
          <div>
            <label>Nome</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              autoComplete="off"
              maxLength={70}
              required
            />

            <label>Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              autoComplete="off"
              maxLength={70}
              required
            />
            </div>

            <div>
            <label>CPF/CNPJ</label>
            <input
              name="document"
              type="text"
              value={document}
              onChange={(e) => { setDocument(e.target.value) }}
              autoComplete="off"
              maxLength={11 || 14}
              required
            />

            <label>Data Nascimento</label>
            <input
              name="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => { setBirthDate(e.target.value) }}
              required
            />
            </div>

            <label>Endereco</label>
            <input
              name="city"
              type="text"
              value={city}
              onChange={(e) => { setCity(e.target.value) }}
              autoComplete="off"
              maxLength={30}
              required
            />
            <input
              name="state"
              type="text"
              value={state}
              onChange={(e) => { setState(e.target.value) }}
              autoComplete="off"
              maxLength={2}
              required
            />
            <input
              name="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => { setPostalCode(e.target.value) }}
              autoComplete="off"
              maxLength={8}
              required
            />
            <input
              name="streetNumber"
              type="number"
              value={streetNumber}
              onChange={(e) => { setStreetNumber(Number(e.target.value)) }}
              autoComplete="off"
              min="1"
              max="1000"
              required
            />

            <label>Features</label>
            <div>
              <input
                name="enabledFeatures1"
                type="checkbox"
                value={0}
                onChange={toggleFeatureOne}
              />
              <span> Crédito </span>

              <input
                name="enabledFeatures2"
                type="checkbox"
                value={1}
                onChange={toggleFeatureTwo}
              />
              <span> Débito </span>
            </div>

            <label>Salário</label>
            <input
              name="salaryBase"
              type="number"
              value={salaryBase}
              onChange={(e) => { setSalaryBase(Number(e.target.value)) }}
              autoComplete="off"
              min="1"
              max="100000000"
              required
            />

            <div className="newuser-button-container">
              <>
                <button type="submit">Solicitar</button>
                {isRequestSucceeded && <p id="submit-success">Solicitação enviada com sucesso.</p>}
                {isRequestFailed && <p id="submit-fail">{ errorMessage }</p>}
              </>
            </div>
          </form>
        </main>
    </div>
  )}

export default NewUser;
