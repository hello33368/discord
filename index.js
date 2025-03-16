require('dotenv').config();  // Loads environment variables from .env file
const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const { deployCommands } = require('./deploy-commands');  // Command deployment function

// Bot ID and Server ID directly included
const botId = '1350787557134176266';  // Replace with your actual bot ID

// Client setup
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// When the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    deployCommands(client); // Deploy commands when the bot is ready
});

// Interaction handling (for slash command)
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'dropdown') {
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Choose an option...')
                .addOptions([
                    { label: 'Handbook', value: 'handbook', description: 'Link to the handbook' },
                    { label: 'Rules', value: 'rules', description: 'Rules Channel' },
                    { label: 'Uniform', value: 'uniform', description: 'Link to the uniform' },
                    { label: 'Vehicle Restrictions', value: 'vehicle', description: 'Information on vehicle restrictions' },
                ]);

            const row = new ActionRowBuilder().addComponents(selectMenu);

            const embed = new EmbedBuilder()
                .setColor(129936)
                .setTitle('**Information**')
                .setDescription('Welcome to TLM! Make sure you read the Handbook, buy and wear the uniform, and check the rules before joining any deployments!');

            // Send a message in the channel instead of replying
            await interaction.channel.send({ embeds: [embed], components: [row] });
        }
    }

    // Handling select menu interaction
    if (interaction.isStringSelectMenu()) {
        let responseEmbed = new EmbedBuilder().setColor(129936);

        if (interaction.values[0] === 'handbook') {
            responseEmbed.setTitle('**Handbook**').setDescription('[Link to the Handbook](https://docs.google.com/document/d/1x1ZR0G78dNa6oEx7GdflsLD3ZLzrwojEjmuDPP9a2B4/edit?usp=sharing)');
        } else if (interaction.values[0] === 'rules') {
            responseEmbed.setTitle('Rules').setDescription('Please check the <#1333039858473500743> channel for the rules!');
        } else if (interaction.values[0] === 'uniform') {
            responseEmbed.setTitle('**Uniform**').setDescription('[Uniform Link](https://www.roblox.com/catalog/85787972042536/TLM-Shirt)');
        } else if (interaction.values[0] === 'vehicle') {
            responseEmbed.setTitle('**Vehicle Restrictions**').setDescription(
                '🟢: *Allowed*  🟡: *Only With Permission*\n\n**Vehicles**:\n' +
                '**2018 Bullhorn Pueblo**: 🟢\n' +
                '**2022 Falcon Traveller**: 🟢\n' +
                '**2020 Overland Apache SFP**: 🟢\n' +
                '**2024 Falcon Advance Bolt**: 🟢\n' +
                '**2022 Falcon Advance**: 🟢\n' +
                '**2020 Leland Vault**: 🟢\n' +
                '**2021 Falcon Rampage Bigfoot 2-Door**: 🟢\n' +
                '**2021 Falcon Rampage Beast**: 🟢\n\n' +
                '**2022 Bullhorn SFP Fury**: 🟡\n' +
                '**2020 Bullhorn Prancer Widebody**: 🟡\n' +
                '**2024 Celestial Truckatron**: 🟡\n\n' +
                '**Vehicle Accessories**:\n' +
                'Vehicle Colors: **Only MOSS**\n' +
                'Rim Color: **Only FOSSIL**'
            );
        }

        // Send a message in the channel instead of replying
        await interaction.channel.send({ embeds: [responseEmbed] });
    }
});

// Login with token from .env
client.login(process.env.TOKEN);
