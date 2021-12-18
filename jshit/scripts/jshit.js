/*
    list of elements:    
    == Item Name Labels ==
    0: head
    1: body
    2: hands
    3: boots
    4: acc1
    5: acc2
    6: acc3
    7: acc4

    == Text Fields ==
    0: headField
    1: bodyField
    2: handsField
    3: bootsField
    4: acc1Field
    5: acc2Field
    6: acc3Field
    7: acc4Field

    == Description Dividers ==
    0: headDescDiv
    1: bodyDescDiv
    2: handsDescDiv
    3: bootsDescDiv
    4: acc1DescDiv
    5: acc2DescDiv
    6: acc3DescDiv
    7: acc4DescDiv

    == Description Fields ==
    0: headDesc
    1: bodyDesc
    2: handsDesc
    3: bootsDesc
    4: acc1Desc
    5: acc2Desc
    6: acc3Desc
    7: acc4Desc
    
    == Show/Hide Buttons ==
    0: showHead
    1: showBody
    2: showHands
    3: showBoots
    4: showAcc1
    5: showAcc2
    6: showAcc3
    7: showAcc4

    == Save/Edit Buttons ==
    0: headSave
    1: headit
    2: bodySave
    3: bodyEdit
    4: handsSave
    5: handsEdit
    6: bootsSave
    7: bootsEdit
    8: acc1Save
    9: acc1Edit
    10: acc2Save
    11: acc2Edit
    12: acc3Save
    13: acc3Edit
    14: acc4Save
    15: acc4Edit
    16: saveAll
    17: clearAll
    */
    console.log("JSHIT | T E S T I N G")

    class InventoryTracker{
        static ID = 'jshit';
        static FLAGS = {
            TRACKER: 'tracker'
        }
        static TEMPLATES = {
            INVENTORYTRACKER: `modules/${this.ID}/templates/jshit.hbs`
        }

        static initialize(){
            this.inventoryTrackerConfig = new InventoryTrackerConfig();
        }
    }

    Hooks.on('init', () => {
        InventoryTracker.initialize();        
    })
    
    /*
    * A single equipment item has the properties:
    * @typedef {Object} Equipment    
    * @property {string} user -- userID associated with this equipment
    * @property {string} equipmentID -- unique equipment ID
    * @property {string} headName -- name of head equipment
    * @property {string} headDesc -- description of head equipment
    * @property {string} bodyName -- name of body equipment
    * @property {string} bodyDesc -- description of body equipment
    * @property {string} handsName -- name of hand equipment
    * @property {string} handsDesc -- description of hand equipment
    * @property {string} bootsName -- you get it by now
    * @property {string} bootsDesc
    * @property {string} acc1Name
    * @property {string} acc1Desc
    * @property {string} acc2Name
    * @property {string} acc2Desc
    * @property {string} acc3Name
    * @property {string} acc3Desc
    * @property {string} acc4Name
    * @property {string} acc4Desc
    */
    class Equipment{
        //need getters and setters for name and description
        //when a setter is called, it should set a flag so that the updated value is associated with the user
        //setter should take in updateData from the text forms on the HTML page       

         //all equipment for all users
         static get allEquipped(){
            const allEquipped = game.users.reduce((accumulator,user) => {
                const userEquipment = this.getUserEquipment(user.id);

                return{
                    ...accumulator,
                    ...userEquipment
                }
            }, {});

            return allEquipped;
        }
        //for loading in all of a given user's equipment
        static getUserEquipment(userID){
            return game.users.get(userID)?.getFlag(InventoryTracker.ID, InventoryTracker.FLAGS.TRACKER);
        }

        static getName(equipID){
            return this.allEquipped[equipID].equipmentName;
        }

        static getDesc(equipID){
            return this.allEquipped[equipID].equipmentDesc;
        }
        /*
        static updateData(equipID, updateData){
            const relevantEquip = this.allEquipped[equipID];
            //let updateData = '{equipmentName: \'' + newName + '\'';
            const update = {
                [equipID]: updateData
            }
            console.log(relevantEquip.user);
            return game.users.get(relevantEquip.user)?.setFlag(InventoryTracker.ID, InventoryTracker.FLAGS.TRACKER, update);
        }*/

        static updateData(equipID, updateData){
            const relevantEquip = this.allEquipped[equipID];
            //console.log(relevantEquip)
            const update = {
                [equipID]: updateData
            }
            //console.log(relevantEquip.user);
            return game.users.get(relevantEquip.user)?.setFlag(InventoryTracker.ID, InventoryTracker.FLAGS.TRACKER, update);
        }

        /*
        static setDesc(equipID, updateData){
            const relevantEquip = this.allEquipped[equipID];
            //let updateData = "{equipmentDesc: '" + newDesc + "'";
            const update = {
                [equipID]: updateData
            }
            return game.users.get(relevantEquip.user)?.setFlag(InventoryTracker.ID, InventoryTracker.FLAGS.TRACKER, update);
        }
        */
        static createNewEquipment(userID){
            const newEquip = {           
                user: userID,
                equipmentID: foundry.utils.randomID(16),
                headName: " ",
                headDesc: " ",
                bodyName: " ",
                bodyDesc: " ",
                handsName: " ",
                handsDesc: " ",
                bootsName: " ",
                bootsDesc: " ",
                acc1Name: " ",
                acc1Desc: " ",
                acc2Name: " ",
                acc2Desc: " ",
                acc3Name: " ",
                acc3Desc: " ",
                acc4Name: " ",
                acc4Desc: " "
            }

            const newEquipment = {
                [newEquip.equipmentID]: newEquip
            }

            return game.users.get(userID)?.setFlag(InventoryTracker.ID, InventoryTracker.FLAGS.TRACKER, newEquipment);
        }

        //this is here for dev purposes and shouldn't ever actually be used in-game
        static deleteEquipment(equipID){
            const relevantEquip = this.allEquipped[equipID];

            const keyDeletion = {
                [`-=${equipID}`]: null
            }

            return game.users.get(relevantEquip.user)?.setFlag(InventoryTracker.ID, InventoryTracker.FLAGS.TRACKER, keyDeletion);
        }    
        
        static loadUserEquipment(userID){
            try{
                const getEquipment = this.getUserEquipment(userID);
                const key = Object.keys(getEquipment)
                const userEquipment = getEquipment[key]

                console.log(userEquipment.headName)

                //head
                document.getElementById("head").value = userEquipment.headName;
                document.getElementById("headField").value = userEquipment.headName;
                document.getElementById("headDesc").value = userEquipment.headDesc;

                //body
                document.getElementById("body").value = userEquipment.bodyName;
                document.getElementById("bodyField").value = userEquipment.bodyName;
                document.getElementById("bodyDesc").value = userEquipment.bodyDesc;

                //hands
                document.getElementById("hands").value = userEquipment.handsName;
                document.getElementById("handsField").value = userEquipment.handsName;
                document.getElementById("handsDesc").value = userEquipment.handsDesc;

                //boots
                document.getElementById("boots").value = userEquipment.bootsName;
                document.getElementById("bootsField").value = userEquipment.bootsName;
                document.getElementById("bootsDesc").value = userEquipment.bootsDesc;

                //accessories
                document.getElementById("acc1").value = userEquipment.acc1Name;
                document.getElementById("acc1Field").value = userEquipment.acc1Name;
                document.getElementById("acc1Desc").value = userEquipment.acc1Desc;

                document.getElementById("acc2").value = userEquipment.acc2Name;
                document.getElementById("acc2Field").value = userEquipment.acc2Name;
                document.getElementById("acc2Desc").value = userEquipment.acc2Desc;

                document.getElementById("acc3").value = userEquipment.acc3Name;
                document.getElementById("acc3Field").value = userEquipment.acc3Name;
                document.getElementById("acc3Desc").value = userEquipment.acc3Desc;

                document.getElementById("acc4").value = userEquipment.acc4Name;
                document.getElementById("acc4Field").value = userEquipment.acc4Name;
                document.getElementById("acc4Desc").value = userEquipment.acc4Desc;
            }
            catch(error){
                this.createNewEquipment(userID);
            }                         
        }
    }

    Hooks.on('renderPlayerList', (playerList, html) => {
        const loggedInUserListItem = html.find(`[data-user-id="${game.userId}"]`)

        const tooltip = game.i18n.localize('JSHIT.button-title');

        loggedInUserListItem.append(`<button type='button' class='equip-list-icon-button flex0' title='${tooltip}'><i class='fas fa-tasks'></i></button>`);

        html.on('click', '.equip-list-icon-button', (event) => {
            console.log("JSHIT | click");
            const userId = $(event.currentTarget).parents('[data-user-id]')?.data()?.userId;

            InventoryTracker.inventoryTrackerConfig.render(true, {userId}); 
            //console.log(game.userId);           
            //Equipment.loadUserEquipment(game.userId);
        });
    });

    class InventoryTrackerConfig extends FormApplication{
        static get defaultOptions(){
            const defaults = super.defaultOptions;

            const overrides = {
                height: 'auto',
                width: '700',
                id: 'equip-list',
                template: InventoryTracker.TEMPLATES.INVENTORYTRACKER,
                title: 'Josh\'s Super Helpful Inventory Tracker',
                userId: game.userId,
                closeOnSubmit: false,
                submitOnChange: true
            }

            const mergedOptions = foundry.utils.mergeObject(defaults,overrides);

            return mergedOptions;
        }        

        getData(options){
            return{
                equip: Equipment.getUserEquipment(options.userId)
            }
        }

        async _updateObject(event, formData){
            const expandedData = foundry.utils.expandObject(formData);
            const userEquipment = this.getData(this.options);
            const key = Object.keys(userEquipment.equip)
            let equipID = userEquipment.equip[key].equipmentID;
            await Equipment.updateData(equipID, expandedData);

            //this.render();
        }

        activateListeners(html){
            super.activateListeners(html);
            Equipment.loadUserEquipment(this.options.userId);
            html.on('click', "[data-action]", this._handleButtonClick.bind(this));
        }

        async _handleButtonClick(event){
            const clickedElement = $(event.currentTarget);
            this._updateObject(event, formData)
        }
    }

    //this block is the script for buttons and shit in the UI
    let nameLbls = ["head","body","hands", "boots", "acc1","acc2","acc3","acc4"];
    let nameFields = ["headField","bodyField","handsField","bootsField","acc1Field","acc2Field","acc3Field","acc4Field"];
    let descDivs = ["headDescDiv","bodyDescDiv","handsDescDiv","bootsDescDiv","acc1DescDiv","acc2DescDiv","acc3DescDiv","acc4DescDiv"];
    let descFields = ["headDesc","bodyDesc","handsDesc","bootsDesc","acc1Desc","acc2Desc","acc3Desc","acc4Desc"];
    let btnList = ["headSave","headit","bodySave","bodyEdit","handsSave","handsEdit","bootsSave","bootsEdit","acc1Save","acc1Edit","acc2Save","acc2Edit",
                    "acc3Save","acc3Edit","acc4Save","acc4Edit","saveAll","clearAll"];
    let showBtns = ["showHead","showBody","showHands","showBoots","showAcc1","showAcc2","showAcc3","showAcc4"];

    function toggleDescription(selector){
        let elem = document.getElementById(descDivs[selector])
        let btn = document.getElementById(showBtns[selector])

        if(elem.style.display === "none"){
            elem.style.display = "block";
            btn.innerHTML = "-";
        }
        else{
            elem.style.display = "none";
            btn.innerHTML = "+";
        }
    }

    function toggleEdit(fSelector, bSelector){
        //enable the text area
        //disable the edit button
        //enable the save button
        let descField = document.getElementById(descFields[fSelector])
        let nameField = document.getElementById(nameFields[fSelector])
        let eBtn = document.getElementById(btnList[bSelector])
        let sBtn = document.getElementById(btnList[bSelector - 1])

        nameField.disabled=false;
        descField.disabled = false;
        eBtn.disabled = true;
        sBtn.disabled = false;
    }//end toggleEdit

    function saveEdit(fSelector, bSelector){
        //set title of text field to value of text area
        //disable text area
        //disable save
        //enable edit
        let descField = document.getElementById(descFields[fSelector])
        let nameField = document.getElementById(nameFields[fSelector]);
        let sBtn = document.getElementById(btnList[bSelector])
        let eBtn = document.getElementById(btnList[bSelector + 1])
        let item = document.getElementById(nameLbls[fSelector])

        item.value = nameField.value;
        item.title = descField.value;
        nameField.disabled = true;
        descField.disabled = true;
        sBtn.disabled = true;
        eBtn.disabled = false;
    }//end saveEdit
    /*
    function loadUserEquipment(){
        const getEquipment = Equipment.getUserEquipment(game.userId);
        const key = Object.keys(getEquipment)
        const userEquipment = getEquipment[key]

        console.log(userEquipment.headName)

        if(userEquipment != null){
            
            //head
            document.getElementById("head").value = userEquipment.headName;
            document.getElementById("headField").value = userEquipment.headName;
            document.getElementById("headDesc").value = userEquipment.headDesc;

            //body
            document.getElementById("body").value = userEquipment.bodyName;
            document.getElementById("bodyField").value = userEquipment.bodyName;
            document.getElementById("bodyDesc").value = userEquipment.bodyDesc;

            //hands
            document.getElementById("hands").value = userEquipment.handsName;
            document.getElementById("handsField").value = userEquipment.handsName;
            document.getElementById("handsDesc").value = userEquipment.handsDesc;

            //boots
            document.getElementById("boots").value = userEquipment.bootsName;
            document.getElementById("bootsField").value = userEquipment.bootsName;
            document.getElementById("bootsDesc").value = userEquipment.bootsDesc;

            //accessories
            document.getElementById("acc1").value = userEquipment.acc1Name;
            document.getElementById("acc1Field").value = userEquipment.acc1Name;
            document.getElementById("acc1Desc").value = userEquipment.acc1Desc;

            document.getElementById("acc2").value = userEquipment.acc2Name;
            document.getElementById("acc2Field").value = userEquipment.acc2Name;
            document.getElementById("acc2Desc").value = userEquipment.acc2Desc;

            document.getElementById("acc3").value = userEquipment.acc3Name;
            document.getElementById("acc3Field").value = userEquipment.acc3Name;
            document.getElementById("acc3Desc").value = userEquipment.acc3Desc;

            document.getElementById("acc4").value = userEquipment.acc4Name;
            document.getElementById("acc4Field").value = userEquipment.acc4Name;
            document.getElementById("acc4Desc").value = userEquipment.acc4Desc;
        }
        else{
            Equipment.createNewEquipment(game.userId);
        }                            
    }*/

    