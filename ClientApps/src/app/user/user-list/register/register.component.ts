import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterFormMode!: boolean;
  RegisterForm: any;
  RolesDDL: any;
  local_data: any;
  breakpoint!: any;
  PaymentMethod: any;
  PersonalForm: any;
  Races: any;
  Religion: any;
  StateDDL: any;
  CityDDL: any;
  BusinessForm: any;
  EmergencyForm: any;
  ChequeForm: any;
  selectedIndex: number = 0;
  IsUserProfile: boolean = false;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
    private UserService: UserService,
    private toaster: ToastrService,
    private UserProfileService: UserProfileService) { 
      this.local_data = {...data}
    }

  ngOnInit(): void {
    this.PersonalForm = this.fb.group({
      UserId: new FormControl(''),
      AddUpdateStatus: new FormControl(''),
      FullName: new FormControl('', [Validators.required]),
      AGPIdCard: new FormControl('', [Validators.required]),
      UserTypeId: new FormControl(0, [Validators.required]),
      NewNRICNo: new FormControl('', [Validators.required]),
      OldNRICNo: new FormControl('',),
      MobilePhoneNo: new FormControl('', [Validators.required]),
      EmailAddress: new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      Gender: new FormControl('', [Validators.required]),
      DOB: new FormControl(new Date(), [Validators.required]),
      RaceId: new FormControl(0, [Validators.required]),
      ReligionId: new FormControl(0, [Validators.required]),
      JoiningDate: new FormControl(new Date(), [Validators.required]),
      DrivingLicenseType: new FormControl(''),
      DrivingLicenseClass: new FormControl(''),
      CompanyVehiclePlateNo: new FormControl(''),
      CompanyVehicleModel: new FormControl(''),
      CompanyHouseAddress: new FormControl('', [Validators.required]),
      Postcode: new FormControl('', [Validators.required]),
      CityId: new FormControl(0, [Validators.required]),
      StateId: new FormControl(0, [Validators.required]),
      Status: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      Password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
    })
    this.BusinessForm = this.fb.group({
      UserId: new FormControl(''),
      AddUpdateStatus: new FormControl(''),
      Company: new FormControl('', [Validators.required]),
      EnterpriseSSMNo: new FormControl('', [Validators.required]),
      SSMExpiryDate: new FormControl(new Date(), [Validators.required]),
      BusinessAddress: new FormControl('', [Validators.required]),
      Postcode: new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      CityId: new FormControl('', [Validators.required]),
      StateId : new FormControl('', [Validators.required]),
      BankName: new FormControl(''),
      BankAccountNo: new FormControl('', [Validators.required]),
      AGPManagerName : new FormControl('', [Validators.required]),
      AGPManagerPhoneNo: new FormControl('', [Validators.required]),
      HouseType : new FormControl(''),
      HomeFurnishing  : new FormControl(''),
      ShopLot: new FormControl(''),
    })
    this.EmergencyForm = this.fb.group({
      UserId: new FormControl(''),
      AddUpdateStatus: new FormControl(''),
      ContactName: new FormControl('', [Validators.required]),
      Relationship: new FormControl('', [Validators.required]),
      ContactNo: new FormControl('', [Validators.required]),
      Vaccination : new FormControl('', [Validators.required]),
    })
    this.ChequeForm = this.fb.group({
      UserId: new FormControl(''),
      AddUpdateStatus: new FormControl(''),
      PloteAmount: new FormControl('', [Validators.required]),
      PlotePaymentMethod: new FormControl('', [Validators.required]),
      PloteRemark: new FormControl('', [Validators.required]),
      OperationReserveAmount: new FormControl('', [Validators.required]),
      OperationReservePaymentMethod: new FormControl('', [Validators.required]),
      OperationReserveRemark: new FormControl('', [Validators.required]),
      JVAgreementAmount: new FormControl('', [Validators.required]),
      JVAgreementPaymentMethod: new FormControl('', [Validators.required]),
      JVAgreementRemark: new FormControl('', [Validators.required]),
      StampingAmount: new FormControl('', [Validators.required]),
      StampingPaymentMethod: new FormControl('', [Validators.required]),
      StampingRemark: new FormControl('', [Validators.required]),
      HouseUtilitiesAmount: new FormControl('', [Validators.required]),
      HouseUtilitiesPaymentMethod: new FormControl('', [Validators.required]),
      HouseUtilitiesRemark: new FormControl('', [Validators.required]),
      HouseFurnishingAmount: new FormControl('', [Validators.required]),
      HouseFurnishingPaymentMethod: new FormControl('', [Validators.required]),
      HouseFurnishingRemark: new FormControl('', [Validators.required]),
      ShopLotAmount: new FormControl('', [Validators.required]),
      ShopLotPaymentMethod: new FormControl('', [Validators.required]),
      ShopLotRemark: new FormControl('', [Validators.required]),
    })
    this.getAllRoles();
    this.getPaymentMethod();
    this.getRaces();
    this.getReligion();
    this.getAllState();
    this.getAllCity();
    this.selectTab(this.selectedIndex);
    this.PersonalForm.get('Status').setValue('1');
    this.BusinessForm.get('UserId')?.setValue('');
    this.EmergencyForm.get('UserId')?.setValue('');
    this.ChequeForm.get('UserId')?.setValue('');
    this.BusinessForm.get('AddUpdateStatus')?.setValue('');
    this.EmergencyForm.get('AddUpdateStatus')?.setValue('');
    this.ChequeForm.get('AddUpdateStatus')?.setValue('');
    //  const UserId = this.local_data.element.userId;
    // if(UserId !== undefined){
    //   this.editUserProfile(UserId);
    // }
    const UserProfile = this.local_data.UserProfile;
    const UserId = this.local_data.element.userId;
    if(UserProfile !== true){
      this.editUserProfile(UserId)
    }
    else{
      this.IsUserProfile = true;
      this.editUserProfile(UserId);
    }
  }
  editUserProfile(key: any) {
    this.UserProfileService.getFullProfileOfUser(key).subscribe((res: any) => {
      this.PersonalForm.get('UserId')?.setValue(res.personalProfile.userId);
      this.PersonalForm.get('AddUpdateStatus')?.setValue("update");
      this.BusinessForm.get('UserId')?.setValue(res.personalProfile.userId);
      this.BusinessForm.get('AddUpdateStatus')?.setValue("update");
      this.EmergencyForm.get('UserId')?.setValue(res.personalProfile.userId);
      this.EmergencyForm.get('AddUpdateStatus')?.setValue("update");
      this.ChequeForm.get('UserId')?.setValue(res.personalProfile.userId);
      this.ChequeForm.get('AddUpdateStatus')?.setValue("update");
      this.editPersonalProfile(res.personalProfile);
      this.editBusinessProfile(res.businessProfile);
      this.editEmergencyProfile(res.userEmergencyProfile);
      this.editChequeProfile(res.userChequeProfile);
    },
    ({error}) => {
      this.toaster.error(error.message);
    }
    )
  }
  editPersonalProfile(element: any) {
    this.PersonalForm.get('FullName')?.setValue(element.fullName);
    this.PersonalForm.get('AGPIdCard')?.setValue(element.agpIdCard);
    this.PersonalForm.get('UserTypeId')?.setValue(element.userTypeId);
    this.PersonalForm.get('NewNRICNo')?.setValue(element.newNRICNo);
    this.PersonalForm.get('OldNRICNo')?.setValue(element.oldNRICNo);
    this.PersonalForm.get('MobilePhoneNo')?.setValue(element.mobilePhoneNo);
    this.PersonalForm.get('EmailAddress')?.setValue(element.emailAddress);
    this.PersonalForm.get('Gender')?.setValue(element.gender);
    this.PersonalForm.get('DOB')?.setValue(element.dob);
    this.PersonalForm.get('RaceId')?.setValue(element.raceId.toString());
    this.PersonalForm.get('ReligionId')?.setValue(element.religionId.toString());
    this.PersonalForm.get('JoiningDate')?.setValue(element.joiningDate);
    this.PersonalForm.get('DrivingLicenseType')?.setValue(element.drivingLicenseType);
    this.PersonalForm.get('DrivingLicenseClass')?.setValue(element.drivingLicenseClass);
    this.PersonalForm.get('CompanyVehiclePlateNo')?.setValue(element.companyVehiclePlateNo);
    this.PersonalForm.get('CompanyVehicleModel')?.setValue(element.companyVehicleModel);
    this.PersonalForm.get('CompanyHouseAddress')?.setValue(element.companyHouseAddress);
    this.PersonalForm.get('Postcode')?.setValue(element.postcode);
    this.PersonalForm.get('CityId')?.setValue(element.cityId.toString());
    this.PersonalForm.get('StateId')?.setValue(element.stateId.toString());
    this.PersonalForm.get('Status')?.setValue(element.status);
    this.PersonalForm.get('UserName').setValidators('');
    this.PersonalForm.get('Password').setValidators('');
    this.PersonalForm.get("UserName").updateValueAndValidity();
    this.PersonalForm.get("Password").updateValueAndValidity();
  }
  editBusinessProfile(element: any) {
    if(element !== null){
      this.BusinessForm.get('Company')?.setValue(element.company);
      this.BusinessForm.get('EnterpriseSSMNo')?.setValue(element.enterpriseSSMNo);
      this.BusinessForm.get('SSMExpiryDate')?.setValue(element.ssmExpiryDate);
      this.BusinessForm.get('BusinessAddress')?.setValue(element.businessAddress);
      this.BusinessForm.get('Postcode')?.setValue(element.postcode);
      this.BusinessForm.get('CityId')?.setValue(element.cityId.toString());
      this.BusinessForm.get('StateId')?.setValue(element.stateId.toString());
      this.BusinessForm.get('BankAccountNo')?.setValue(element.bankAccountNo);
      this.BusinessForm.get('AGPManagerName')?.setValue(element.agpManagerName);
      this.BusinessForm.get('AGPManagerPhoneNo')?.setValue(element.agpManagerPhoneNo);
      this.BusinessForm.get('HouseType')?.setValue(element.houseType);
      this.BusinessForm.get('HomeFurnishing')?.setValue(element.homeFurnishing);
      this.BusinessForm.get('ShopLot')?.setValue(element.ShopLot);
    }
  }
  editEmergencyProfile(element: any) {
   if(element !== null){
    this.EmergencyForm.get('ContactName')?.setValue(element.contactName);
    this.EmergencyForm.get('Relationship')?.setValue(element.relationship);
    this.EmergencyForm.get('ContactNo')?.setValue(element.contactNo);
    this.EmergencyForm.get('Vaccination')?.setValue(element.vaccination);
   }
  }
  editChequeProfile(element: any) {
    if(element !== null){
      this.ChequeForm.get('PloteAmount')?.setValue(element.ploteAmount);
      this.ChequeForm.get('PlotePaymentMethod')?.setValue(element.plotePaymentMethod);
      this.ChequeForm.get('PloteRemark')?.setValue(element.ploteRemark);
      this.ChequeForm.get('OperationReserveAmount')?.setValue(element.operationReserveAmount);
      this.ChequeForm.get('OperationReservePaymentMethod')?.setValue(element.operationReservePaymentMethod);
      this.ChequeForm.get('OperationReserveRemark')?.setValue(element.operationReserveRemark);
      this.ChequeForm.get('JVAgreementAmount')?.setValue(element.jvAgreementAmount);
      this.ChequeForm.get('JVAgreementPaymentMethod')?.setValue(element.jvAgreementPaymentMethod);
      this.ChequeForm.get('JVAgreementRemark')?.setValue(element.jvAgreementRemark);
      this.ChequeForm.get('StampingAmount')?.setValue(element.stampingAmount);
      this.ChequeForm.get('StampingPaymentMethod')?.setValue(element.stampingPaymentMethod);
      this.ChequeForm.get('StampingRemark')?.setValue(element.stampingRemark);
      this.ChequeForm.get('HouseUtilitiesAmount')?.setValue(element.houseUtilitiesAmount);
      this.ChequeForm.get('HouseUtilitiesPaymentMethod')?.setValue(element.houseUtilitiesPaymentMethod);
      this.ChequeForm.get('HouseUtilitiesRemark')?.setValue(element.houseUtilitiesRemark);
      this.ChequeForm.get('HouseFurnishingAmount')?.setValue(element.houseFurnishingAmount);
      this.ChequeForm.get('HouseFurnishingPaymentMethod')?.setValue(element.houseFurnishingPaymentMethod);
      this.ChequeForm.get('HouseFurnishingRemark')?.setValue(element.houseFurnishingRemark);
      this.ChequeForm.get('ShopLotAmount')?.setValue(element.shopLotAmount);
      this.ChequeForm.get('ShopLotPaymentMethod')?.setValue(element.shopLotPaymentMethod);
      this.ChequeForm.get('ShopLotRemark')?.setValue(element.shopLotRemark);
    }
  }
  getPaymentMethod(){
    this.UserProfileService.GetPaymentMethod().subscribe((res: any) =>{
      debugger
      this.PaymentMethod= res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  getRaces(){
    this.UserProfileService.GetRaces().subscribe((res: any) =>{
      this.Races= res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  getAllState(){
    this.UserProfileService.getAllState().subscribe((res: any) =>{
      this.StateDDL= res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  getAllCity(){
    this.UserProfileService.getAllCity().subscribe((res: any) =>{
      this.CityDDL= res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  getReligion(){
    this.UserProfileService.GetReligion().subscribe((res: any) =>{
      this.Religion= res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  SaveUserPersonalInfo(){
    const AddUpdateStatus = this.PersonalForm.value.AddUpdateStatus;
    if(AddUpdateStatus === "add" || AddUpdateStatus === ""){
      this.addUserPersonal();
    }
    else{
      this.UpdateUserPersonal();
    }
  }
  addUserPersonal() {
    const key = this.PersonalForm.getRawValue();
    this.UserProfileService.AddUserPersonalInfo(key).subscribe((res: any) =>{
      this.toaster.success(res.message);
      debugger
      this.BusinessForm.get('UserId')?.setValue(res.userId);
      this.BusinessForm.get('AddUpdateStatus')?.setValue("add");
      this.PersonalForm.reset();
      this.selectedIndex = 1;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  UpdateUserPersonal() {
    const key = this.PersonalForm.getRawValue();
    if(key.UserId !== null && key.UserId !== undefined)
    {
      this.UserProfileService.UpdateUserPersonalInfo(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        this.BusinessForm.get('UserId')?.setValue(res.userId);
        this.BusinessForm.get('AddUpdateStatus')?.setValue("update");
        this.PersonalForm.reset();
        this.selectedIndex = 1;
      },
      ({error}) =>{
        this.toaster.error(error.message);
      })
    }else{
      this.toaster.warning("User Id Can't be Null");
    }
  }

  SaveBusinessProfile(){
    const AddUpdateStatus = this.BusinessForm.value.AddUpdateStatus;
    if(AddUpdateStatus !== ""){
      if(AddUpdateStatus === "add"){
        this.addBusinessProfile()
      }
      else{
        this.UpdateBusinessProfile();
      }
    }
    else{
      this.toaster.warning("Personal Profile added First");
    }
  }
  addBusinessProfile() {
    const key = this.BusinessForm.getRawValue();
    if(key.UserId !== null && key.UserId !== undefined){
      this.UserProfileService.AddUserBusinessProfile(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        this.EmergencyForm.get('UserId')?.setValue(res.userId);
        this.EmergencyForm.get('AddUpdateStatus')?.setValue("add");
        this.PersonalForm.reset();
        this.selectedIndex = 2;
      },
      ({error}) =>{
        this.toaster.error(error.message);
      })
    }
    else{
      this.toaster.warning("Please add Personal Profile First");
    }
  }
  UpdateBusinessProfile() {
    const key = this.BusinessForm.getRawValue();
    if(key.UserId !== null && key.UserId !== undefined){
      this.UserProfileService.UpdateUserBusinessProfile(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        this.EmergencyForm.get('UserId')?.setValue(res.userId);
        this.EmergencyForm.get('AddUpdateStatus')?.setValue("update");
        this.PersonalForm.reset();
        this.selectedIndex = 2;
      },
      ({error}) =>{
        this.toaster.error(error.message);
      })
    }
    else{
      this.toaster.warning("User Id Can't be Null");
    }
  }
  SaveUserEmergencyProfile(){
    const AddUpdateStatus = this.EmergencyForm.value.AddUpdateStatus;
    if(AddUpdateStatus !== ""){
      if(AddUpdateStatus === "add"){
        this.addEmergencyProfile();
      }
      else{
        this.UpdateEmergencyProfile();
      }
    }
    else{
      this.toaster.warning("Business Profile added First");
    }
  }
  addEmergencyProfile() {
    const key = this.EmergencyForm.getRawValue();
    if(key.UserId !== null && key.UserId !== undefined){
      this.UserProfileService.AddUserEmergencyProfile(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        debugger
        this.ChequeForm.get('UserId')?.setValue(res.userId);
        this.ChequeForm.get('AddUpdateStatus')?.setValue("add");
        this.EmergencyForm.reset();
        this.selectedIndex = 3;
      },
      ({error}) =>{
        this.toaster.error(error.message);
      })
    }
    else{
      this.toaster.warning("Please add Personal Profile First");
    }
  }
  UpdateEmergencyProfile() {
    const key = this.EmergencyForm.getRawValue();
    debugger
    if(key.UserId !== null && key.UserId !== undefined){
      this.UserProfileService.UpdateUserEmergencyProfile(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        this.ChequeForm.get('UserId')?.setValue(res.userId);
        this.ChequeForm.get('AddUpdateStatus')?.setValue("update");
        this.EmergencyForm.reset();
        this.selectedIndex = 3;
      },
      ({error}) =>{
        this.toaster.error(error.message);
      })
    }
    else{
      this.toaster.warning("User Id Can't be Null");
    }
  }
  
  SaveUserChequeProfile(){
    const AddUpdateStatus = this.ChequeForm.value.AddUpdateStatus;
    if(AddUpdateStatus !== ""){
      if(AddUpdateStatus === "add"){
        this.addChequeProfile();
      }
      else{
        this.UpdateChequeProfile();
      }
    }
    else{
      this.toaster.warning("Personal Profile added First");
    }
  }
  addChequeProfile() {
    const key = this.ChequeForm.getRawValue();
    if(key.UserId !== null && key.UserId !== undefined){
      this.UserProfileService.AddUserChequeProfile(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        this.EmergencyForm.reset();
        this.dialogRef.close();
      },
      ({error}) =>{
        this.toaster.error(error.message);
      })
    }
    else{
      this.toaster.warning("Please add Personal Profile First");
    }
    
  }
  UpdateChequeProfile() {
    const key = this.ChequeForm.getRawValue();
    debugger
    if(key.UserId !== null && key.UserId !== undefined){
      this.UserProfileService.UpdateUserChequeProfile(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        this.EmergencyForm.reset();
        this.dialogRef.close();
      },
      ({error}) =>{
        this.toaster.error(error.message);
      })
    }
    else{
      this.toaster.warning("User Id Can't be Null");
    }
  }

  getAllRoles(){
    this.UserService.getAllRole().subscribe((res) =>{
      this.RolesDDL = res;
    },
    ({error}) =>{
       this.toaster.error(error.message);
    }
    )
  }

  SaveUser(){
    const UserId = this.RegisterForm.value.UserId;
    if(UserId === undefined || UserId === ""){
      this.AddUser();
    }
    else{
      this.UpdateUser();
    }
  }
  UpdateUser() {
   
  }
  
  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  AddUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Add User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        const data = {
          FirstName: this.RegisterForm.value.FirstName,
          LastName: this.RegisterForm.value.LastName
        }
        const key = {
          UserName: this.RegisterForm.value.Email,
          Email: this.RegisterForm.value.Email,
          FullName: data.FirstName + " " + data.LastName,
          RoleId: this.RegisterForm.value.RoleId,
          Password: this.RegisterForm.value.Password,
          ConfirmPassword: this.RegisterForm.value.ConfirmPassword
        }
        if(key.Password === key.ConfirmPassword){
          this.UserService.addUser(key).subscribe((res: any) =>{
          Swal.fire({
            title: 'Added!',
            text: 'Your selected User has been Added.',
            icon: 'success',
            timer: 800,
            showConfirmButton: false,
          })
          this.RegisterForm.reset();
          this.closeDialog();
            },
            ({error}) =>{
              this.toaster.error(error.message);
            });
        }
        else(
          this.toaster.error("Password and confirm Password not match")
        )
      }
    });
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
