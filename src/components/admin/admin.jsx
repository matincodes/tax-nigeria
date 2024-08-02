import { Routes, Route } from 'react-router-dom'
import DashNav from '../../routes/dashnav/dashnav'
import Dashboard from '../dashboard/dashboard'
import BusinessSector from '../business-sector-page/business-sector-page'
import ConsultantPage from '../consultant-page/consultant-page'
import AgentPage from '../agent/agent-page'
import TaskCardManagement from '../task-card-management/task-card-management'
import AgentProfile from '../profile/agentprofile'
import ConsultantProfile from '../profile/consultantprofile'
import StationManagement from '../station-management/station-management'
import ProfileSettings from '../profile-settings/profile-settings'
import TaxPayerManagement from '../taxpayer/taxpayer-management'
import AddBusinessSector from '../business-sector-page/add-business-sector'
import ConsultantReg from '../../routes/consultant-reg/consultant-reg'
import TaxStationReg from '../../routes/taxstation-reg/taxstation-reg'
import TaxAgentReg from '../../routes/taxagent-reg/taxagent-reg'
import MiniTaxStationReg from '../../routes/minitaxstation-reg/minitaxstation-reg'
import DebtManagement from '../debt-management/debt-management'
import TaxpayerForm from '../../routes/taxpayer-reg/taxpayer-form/taxpayer-form'
import Assessment from '../../routes/assessment/assessment'
import Billing from '../../routes/billing/billing'
import BusinessTypePage from '../business-type-page/business-type-page'
import AddBusinessType from '../business-type-page/add-business-type'
import BillDetails from '../../routes/billing/bill-details'

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<DashNav />}>
          <Route index element={<Dashboard />} />
          <Route path='business/sector' element={<BusinessSector />} />
          <Route path='business/type' element={<BusinessTypePage />} />
          <Route
            path='business/add-business-sector'
            element={<AddBusinessSector />}
          />
          <Route
            path='business/add-business-type'
            element={<AddBusinessType />}
          />
          <Route path='consultant' element={<ConsultantPage />} />
          <Route path='agent' element={<AgentPage />} />
          <Route path='taxcard' element={<TaskCardManagement />} />
          <Route path='agent-profile' element={<AgentProfile />} />
          <Route path='consultant-profile' element={<ConsultantProfile />} />
          <Route path='station' element={<StationManagement />} />
          <Route path='taxpayer' element={<TaxPayerManagement />} />
          <Route path='settings' element={<ProfileSettings />} />
          <Route path='taxagent-registration' element={<TaxAgentReg />} />
          <Route
            path='taxconsultant-registration'
            element={<ConsultantReg />}
          />
          <Route path='taxstation-registration' element={<TaxStationReg />} />
          <Route
            path='minitaxstation-registration'
            element={<MiniTaxStationReg />}
          />
          <Route path='debt-management' element={<DebtManagement />} />
          <Route path='onboarding' element={<TaxpayerForm />} />
          <Route path='assessment' element={<Assessment />} />
          <Route path='billing' element={<Billing />} />
          <Route path='billing/bill-details/:id' element={<BillDetails />} />
        </Route>
      </Routes>
    </div>
  )
}

export default Admin
