import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Customer from 'App/Models/Customer'
import Company from 'App/Models/Company'
import { accessCompany, accessCompanyCustomer, accessCustomers } from 'App/Helpers/PolicyHelper'

export default class CustomerPolicy extends BasePolicy {
  public async view(user: User, company: Company | null, customer: Customer) {
    const resourcePermission = 'can_view_customers'
    return await accessCompanyCustomer(resourcePermission, user, company ?? null, customer)
  }

  public async create(user: User, company: Company) {
    const resourcePermission = 'can_create_customers'
    return await accessCompany(resourcePermission, user, company)
  }

  public async edit(user: User, company: Company | null, customer: Customer) {
    const resourcePermission = 'can_edit_customers'
    return await accessCompanyCustomer(resourcePermission, user, company ?? null, customer)
  }

  public async delete(user: User, company: Company | null, customer: Customer) {
    const resourcePermission = 'can_delete_customers'
    return await accessCompanyCustomer(resourcePermission, user, company ?? null, customer)
  }

  public async massDelete(authUser: User, requestedCustomerIds: string[]) {
    const resourcePermission = 'can_delete_customers'
    return await accessCustomers(resourcePermission, authUser, requestedCustomerIds)
  }

  public async list(user: User, company: Company) {
    const resourcePermission = 'can_list_customers'
    return await accessCompany(resourcePermission, user, company)
  }
}
